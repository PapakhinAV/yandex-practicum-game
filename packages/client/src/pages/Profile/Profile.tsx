import React, { FC } from 'react'
import CustomButton from '../../components/Button/Button'
import { Avatar, Box, Modal, useDisclosure } from '@chakra-ui/react'
import ModalEdit from './ModalEdit'
import ModalChangePassword from './ModalChangePassword'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'
import { useChangeAvatarProfileMutation } from '../../api/user'
import { useLogoutMutation } from '../../api/auth'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { getThemeColors } from '../../App/constants'

const Profile: FC = () => {
  const user = useSelector((state: IRootState) => state.app.user)
  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure()
  const {
    isOpen: isOpenPassword,
    onOpen: onOpenPassword,
    onClose: onClosePassword,
  } = useDisclosure()
  const [changeAvatarProfile] = useChangeAvatarProfileMutation()
  const [logout] = useLogoutMutation()

  const themeColors = getThemeColors(currentTheme)

  if (!user) return <></>

  return (
    <>
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>
      <Box
        display="grid"
        minW={400}
        maxW={600}
        borderTop='2px solid #ffffff85'
        borderBottom='2px solid #00000085'
        background={themeColors.BACKGROUND}
        backdropFilter="auto"
        backdropBlur='15px'
        gap={30}
        position="absolute"
        top="50%"
        left="50%"
        marginRight="-50%"
        transform="translate(-50%, -50%)"
        borderRadius="12px"
        justifyContent="center"
        padding='60px 70px'
      >
        <Avatar
          name={`${user.first_name || ''} ${user.second_name || ''}`}
          src={`${__SERVER_API__}/api/v2/resources${user.avatar}`}
          size="2xl"
          margin="auto"
        />
        <CustomButton
          width={250}
          type="button"
          onClick={() => {
            const input = document.createElement('input')
            input.type = 'file'
            input.onchange = () => {
              if (input?.files?.length) {
                const data = new FormData()
                data.append('avatar', input.files[0])
                changeAvatarProfile(data)
              }
            }
            input.click()
          }}
        >
          Изменить аватар
        </CustomButton>
        <CustomButton width={250} onClick={onOpenEdit}>
          Редактировать
        </CustomButton>
        <CustomButton width={250} onClick={onOpenPassword}>
          Изменить пароль
        </CustomButton>
        <CustomButton
          colorScheme="red"
          width={250}
          onClick={() => logout().unwrap()}
        >
          Выйти
        </CustomButton>
        <Modal isOpen={isOpenPassword} onClose={onClosePassword}>
          <ModalChangePassword onClose={onClosePassword} />
        </Modal>
        <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
          <ModalEdit onClose={onCloseEdit} user={user} />
        </Modal>
      </Box>
    </>
  )
}

export default Profile

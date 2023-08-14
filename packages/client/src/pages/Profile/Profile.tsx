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

const Profile: FC = () => {
  const isAuth = useSelector((state: IRootState) => state.app.isAuth)
  const user = useSelector((state: IRootState) => state.app.user)
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

  if (!isAuth) return <></>

  return (
    <>
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>
      <Box
        display="grid"
        minW={400}
        maxW={600}
        border="12px"
        background="blackAlpha.400"
        gap={30}
        position="absolute"
        top="50%"
        left="50%"
        marginRight="-50%"
        transform="translate(-50%, -50%)"
        borderRadius="4px"
        justifyContent="center"
        padding="20px"
      >
        <Avatar
          name={`${user.first_name || ''} ${user.second_name || ''}`}
          src={`https://ya-praktikum.tech/api/v2/resources${user.avatar}`}
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

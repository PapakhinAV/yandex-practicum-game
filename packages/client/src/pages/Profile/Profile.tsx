import React, { FC } from 'react'
import CustomButton from '../../components/Button/Button'
import { Avatar, Box, Modal, useDisclosure } from '@chakra-ui/react'
import ModalEdit from './ModalEdit'
import ModalChangePassword from './ModalChangePassword'

const Profile: FC = () => {
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

  return (
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
      padding="20px">
      <Avatar
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        size="2xl"
        margin="auto"
      />
      <CustomButton width={250} onClick={onOpenEdit}>
        Редактировать
      </CustomButton>
      <CustomButton width={250} onClick={onOpenPassword}>
        Изменить пароль
      </CustomButton>
      <CustomButton colorScheme="red" width={250}>
        Выйти
      </CustomButton>
      <Modal isOpen={isOpenPassword} onClose={onClosePassword}>
        <ModalChangePassword onClose={onClosePassword} />
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalEdit onClose={onCloseEdit} />
      </Modal>
    </Box>
  )
}

export default Profile

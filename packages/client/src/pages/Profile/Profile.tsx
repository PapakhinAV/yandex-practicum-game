import React from 'react'
import CustomButton from '../../components/Button/Button'
import {
  Avatar,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  FormLabel,
  FormControl,
  useDisclosure,
} from '@chakra-ui/react'
import CustomInput from '../../components/fields/Input/Input'

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <CustomButton width={250} onClick={onOpen}>
        Редактировать
      </CustomButton>
      <CustomButton width={250}>Изменить пароль</CustomButton>
      <CustomButton colorScheme="red" width={250}>
        Выйти
      </CustomButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Редактирование</ModalHeader>
          <ModalBody>
            <FormControl mb={5}>
              <FormLabel>Имя</FormLabel>
              <CustomInput name="first_name" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Фамилия</FormLabel>
              <CustomInput name="last_name" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Почта</FormLabel>
              <CustomInput name="email" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Телефон</FormLabel>
              <CustomInput name="phone" />
            </FormControl>
            <FormControl mb={5}>
              <FormLabel>Логин</FormLabel>
              <CustomInput name="login" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <CustomButton>Сохранить</CustomButton>
            <CustomButton variant="ghost" mr={3} onClick={onClose}>
              Закрыть
            </CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Profile

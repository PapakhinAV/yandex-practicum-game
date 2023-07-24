import React, { FC } from 'react'
import CustomButton from '../../components/Button/Button'
import {
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'
import CustomInput from '../../components/fields/Input/Input'

interface ModalChangePasswordProps {
  onClose: () => void
}

const ModalChangePassword: FC<ModalChangePasswordProps> = ({ onClose }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Изменение пароля</ModalHeader>
        <ModalBody>
          <FormControl mb={5}>
            <FormLabel>Старый пароль</FormLabel>
            <CustomInput name="first_name" />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Новый пароль</FormLabel>
            <CustomInput name="newPassword" />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Новый пароль(ещё)</FormLabel>
            <CustomInput name="newPasswordAgain" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <CustomButton>Сохранить</CustomButton>
          <CustomButton variant="ghost" mr={3} onClick={onClose}>
            Закрыть
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ModalChangePassword

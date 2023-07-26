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
  Text,
} from '@chakra-ui/react'
import {
  passwordValidator,
  twoPasswordValidator,
} from '../../utils/validators/validators'
import FormInput from '../../components/formFields/FormInput/FormInput'
import { useForm } from 'react-hook-form'
import CustomForm from '../../components/Form/Form'
import { useChangePasswordMutation } from '../../reducers/user'

interface ModalChangePasswordProps {
  onClose: () => void;
}

const ModalChangePassword: FC<ModalChangePasswordProps> = ({ onClose }) => {
  const methods = useForm()
  const [changePassword, { isLoading, isError }] = useChangePasswordMutation()
  const onSubmit = async (data: Record<string, string>) => {
    await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }).unwrap()
  }
  console.log(useChangePasswordMutation())
  return (
    <CustomForm onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Изменение пароля</ModalHeader>
        <ModalBody>
          <FormControl mb={5}>
            <FormLabel>Старый пароль</FormLabel>
            <FormInput name="oldPassword" />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Новый пароль</FormLabel>
            <FormInput
              name="newPassword"
              registerOptions={{
                validate: value => passwordValidator(value),
              }}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Новый пароль(ещё)</FormLabel>
            <FormInput
              name="newPasswordAgain"
              registerOptions={{
                validate: (value, formValues) =>
                  twoPasswordValidator(value, undefined, formValues),
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {isError && (
            <Text color="red" mr="10">
              Не удалось сохранить
            </Text>
          )}
          <CustomButton type="submit" disabled={isLoading}>
            Сохранить
          </CustomButton>
          <CustomButton variant="ghost" mr={3} onClick={onClose}>
            Закрыть
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </CustomForm>
  )
}

export default ModalChangePassword

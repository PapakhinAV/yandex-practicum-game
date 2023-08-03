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
import CustomForm from '../../components/Form/Form'
import { FieldValues, useForm } from 'react-hook-form'
import FormInput from '../../components/formFields/FormInput/FormInput'
import {
  emailValidator,
  nameValidator,
  phoneValidator,
  loginValidator,
} from '../../utils/validators/validators'
import { useChangeProfileMutation } from '../../api/user'
import { IUserState } from '../../store/appReducer'

interface ModalEditProps {
  onClose: () => void
  user: IUserState
}

const ModalEdit: FC<ModalEditProps> = ({ onClose, user }) => {
  const methods = useForm<FieldValues>({
    defaultValues: {
      first_name: user.first_name || '',
      second_name: user.second_name || '',
      login: user.login || '',
      display_name: user.display_name || '',
      email: user.email || '',
      phone: user.phone || '',
    },
  })

  const [changeProfile, { isLoading, isError }] = useChangeProfileMutation()

  const onSubmit = async (data: unknown) => {
    await changeProfile(data).unwrap()
  }
  return (
    <CustomForm onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Редактирование</ModalHeader>
        <ModalBody>
          <FormControl mb={5}>
            <FormLabel>Имя</FormLabel>
            <FormInput
              name="first_name"
              registerOptions={{
                validate: value => nameValidator(value),
              }}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Фамилия</FormLabel>
            <FormInput
              name="second_name"
              registerOptions={{
                validate: value => nameValidator(value),
              }}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Почта</FormLabel>
            <FormInput
              name="email"
              registerOptions={{
                validate: value => emailValidator(value),
              }}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Телефон</FormLabel>
            <FormInput
              name="phone"
              registerOptions={{
                validate: value => phoneValidator(value),
              }}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Отображаемое имя</FormLabel>
            <FormInput name="display_name" />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Логин</FormLabel>
            <FormInput
              name="login"
              registerOptions={{
                validate: value => loginValidator(value),
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

export default ModalEdit

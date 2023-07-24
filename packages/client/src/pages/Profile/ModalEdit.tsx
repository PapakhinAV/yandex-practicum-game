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
import CustomForm from '../../components/Form/Form'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/formFields/FormInput/FormInput'
import {
  emailValidator,
  nameValidator,
  phoneValidator,
  loginValidator,
} from '../../utils/validators/validators'

interface ModalEditProps {
  onClose: () => void
}

const ModalEdit: FC<ModalEditProps> = ({ onClose }) => {
  const methods = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
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
          <CustomButton type="submit">Сохранить</CustomButton>
          <CustomButton variant="ghost" mr={3} onClick={onClose}>
            Закрыть
          </CustomButton>
        </ModalFooter>
      </ModalContent>
    </CustomForm>
  )
}

export default ModalEdit

import { FC } from 'react'
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
  SimpleGrid,
  GridItem
} from '@chakra-ui/react'
import FormInput from '../../components/formFields/FormInput/FormInput'
import FormTextarea from '../../components/formFields/FormTextarea/FormTextarea'
import CustomForm from '../../components/Form/Form'
import { useForm } from 'react-hook-form'
import {
  topicTitleValidator,
  messageValidator
} from '../../utils/validators/validators'

interface ModalCreateTopicProps {
  onClose: () => void;
}

const ModalCreateTopic: FC<ModalCreateTopicProps> = ({ onClose }) => {
  const methods = useForm()
  const onSubmit = (data: unknown) => {
    console.log(data)
  }
  const isError = true

  return (
    <CustomForm onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader textAlign='center'>Создание темы</ModalHeader>
        <ModalBody>
          <FormControl mb={5}>
            <FormLabel>Название</FormLabel>
            <FormInput 
              name="title"
              registerOptions={{
                validate: value => topicTitleValidator(value),
              }}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>Сообщение</FormLabel>
            <FormTextarea 
              name="message" 
              rows={3} 
              resize='none' 
              registerOptions={{
                validate: value => messageValidator(value),
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <SimpleGrid 
            columns={2} 
            columnGap={3} 
            rowGap={6} 
            w="full"
          >
            <GridItem colSpan={2}>
              {isError && (
                <Text 
                  color="red" 
                  textAlign='center'
                >
                  Не удалось сохранить
                </Text>
              )}
            </GridItem>
            <GridItem colSpan={1}>
              <CustomButton 
                colorScheme="red" 
                w='full' 
                mr={3} 
                onClick={onClose}
              >
                Отмена
              </CustomButton>
            </GridItem>
            <GridItem colSpan={1}>
              <CustomButton 
                w='full' 
                type="submit" 
              >
                Создать
              </CustomButton>
            </GridItem>
          </SimpleGrid>
        </ModalFooter>
      </ModalContent>
    </CustomForm>
  )
}

export default ModalCreateTopic

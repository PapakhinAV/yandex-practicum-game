import {
  Center,
  Heading,
  Box,
  HStack,
  Grid,
  Container,
  Spinner,
} from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { EColors } from '../../App/constants'
import { Form, NavButton } from '../../components'
import { FormTextarea } from '../../components'
import { Button } from '../../components'
import { Message } from './components'
import { IconSend } from './components'
import styles from './ForumTopic.module.scss'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { useCreateMessageMutation, useGetTopicQuery } from '../../api/forum'

const ForumTopic: FC = () => {
  const { topicId } = useParams<'topicId'>()
  const topic = useGetTopicQuery(Number(topicId), {skip: !topicId})
  const [handleCreate, createMessage] = useCreateMessageMutation()
  const methods = useForm()
  const onSubmit = (data: Record<string, string>): void => {
    methods.setValue('message', '')
    handleCreate({ ...data, topicId: Number(topicId) })
  }

  useEffect(() => {
    if (!createMessage.isLoading && createMessage.isSuccess) topic.refetch()
  }, [createMessage.isLoading])

  return (
    <>
    <Helmet>
      <title>{topic.data?.name || 'Загрузка'}</title>
    </Helmet>
    <Container maxW='700px' p={0}>
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.BACK}/>
      </Box>
      <Grid
        h='100vh'
        w='full'
        templateRows='auto 1fr auto'
        gap={4}
      >
        <Center pt={8} h={68}>
          {topic.isLoading
            ? <Spinner/>
            : <Heading size='md' margin={0}>{topic.data?.name}</Heading>}
        </Center>
        <Box
          overflowY="auto"
          maxHeight="auto"
        >
          {topic.data && (
            <Message message={{ content: topic.data.body, createdAt: topic.data.createdAt, user: topic.data.user, id: 0 }} />
          )}
          { topic.isLoading
            ? <Center><Spinner/></Center>
            : topic.data?.messages.map(message =>
                <Message key={`msg-${message.id}`} message={message}></Message>
              )
          }
        </Box>
        <HStack
          p='15px'
          pb='10px'
          bg={EColors.BLACK_ALPHA}
          borderRadius='10px 10px 0 0'
        >
          <Form
            onSubmit={methods.handleSubmit(onSubmit)}
            methods={methods}
            className={styles.full}
          >
            <HStack>
              <FormTextarea
                name='content'
                bg={EColors.WHITE}
                rows={1}
                resize='none'
                autoFocus
              />
              <Button w='40px' p={0} type="submit">
                <IconSend width='20' height='20' fill={EColors.WHITE}/>
              </Button>
            </HStack>
          </Form>
        </HStack>
      </Grid>
    </Container>
    </>
  )
}

export default ForumTopic

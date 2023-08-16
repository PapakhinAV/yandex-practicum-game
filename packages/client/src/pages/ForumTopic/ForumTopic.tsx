import {
  Center,
  Heading,
  Box,
  HStack,
  Grid,
  Container,
  Spinner,
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TTopic, TMessage } from './types'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { EColors } from '../../App/constants'
import { Form, NavButton } from '../../components'
import { FormTextarea } from '../../components'
import { Button } from '../../components'
import { Message } from './components'
import { IconSend } from './components'
import styles from './ForumTopic.module.scss'
import { ENavButtonDirection } from '../../components/NavButton/types'

const mockTopicData = {
  id: '1',
  title: 'Не могу пройти первый уровень',
  replies: 3,
  userId: 1
}

const mockUser1 = {
  id: 1,
  first_name: 'Kent',
  second_name: 'Dodds',
  display_name: 'Kent Dodds',
  avatar: 'https://bit.ly/kent-c-dodds',
  login: 'kentukki'
}

const mockUser2 = {
  id: 2,
  first_name: 'Ryan',
  second_name: 'Florence',
  display_name: 'Ryan Florence',
  avatar: 'https://bit.ly/ryan-florence',
  login: 'ryanryanryan'
}

const mockMessagesData = [
  { id: '199', time: '2023-07-27T21:24:38.000Z', user: mockUser1, content:'Всем привет! Возникла проблемка... Не могу понять что делать нужно. Уже все перепробовал. Орки пробегают по карте и у меня отнимаются жизни' },
  { id: '201', time: '2023-07-27T21:26:38.000Z', user: mockUser2, content:'Привет! Строй башни и все будет ОК' },
  { id: '313', time: '2023-07-27T21:29:38.000Z', user: mockUser1, content:'А как их строить?' },
  { id: '351', time: '2023-07-27T21:26:38.000Z', user: mockUser2, content:'На карте есть специальные места. Покликай мышью... Все же интуитивно понятно!' },
  { id: '873', time: '2023-07-27T21:26:38.000Z', user: mockUser1, content:'Спаибо огромное! Разобрался!' },
]

const ForumTopic: FC = () => {
  const [topicData, setTopicData] = useState<TTopic | null>(null)
  const [topicLoading, setTopicLoading] = useState(true)

  const [messagesData, setMessagesData] = useState<TMessage[]>([])
  const [messagesLoading, setMessagesLoading] = useState(true)

  const { topicId } = useParams<'topicId'>()

  useEffect(() => {
    /** Запрос данных по топику (на текущем этапе мок)  */
    const topicTimeoutId = setTimeout(() => {
      setTopicData(mockTopicData)
      setTopicLoading(false)
    }, 500)

    /** Запрос данных о сообщениях (на текущем этапе мок)  */
    const messagesTimeoutId = setTimeout(() => {
      setMessagesData(mockMessagesData)
      setMessagesLoading(false)
    }, 1000)

    return () => {
      clearTimeout(topicTimeoutId)
      clearTimeout(messagesTimeoutId)
    }
  }, [])

  const methods = useForm()
  const onSubmit = (data: unknown) => {
    console.log(data)
  }
  const title = topicData?.title || 'Loading...'

  return (
    <>
    <Helmet>
      <title>{title}</title>
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
          {topicLoading
            ? <Spinner/>
            : <Heading size='md' margin={0} color={EColors.WHITE}>{title}</Heading>}
        </Center>
        <Box
          overflowY="auto"
          maxHeight="auto"
        >
          { messagesLoading
            ? <Center><Spinner/></Center>
            : messagesData.map(message =>
                <Message key={`msg-${message.id}`} messageData={message}></Message>
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
                name='message'
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

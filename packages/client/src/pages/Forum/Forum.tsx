import { 
  Center, 
  Heading,
  Box,
  Grid,
  Container, 
  Spinner,
  Modal, 
  useDisclosure
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import CustomButton from '../../components/Button/Button'
import { EColors } from '../../App/constants'
import ModalCreateTopic from './ModalCreateTopic'
import { ForumTable } from './components'
import type { Topic } from './types'

const mockData = [
  { id: '1', title: 'Не могу пройти первый уровень ', replies: 4 },
  { id: '2', title: 'Есть проблема с 7 уровнем... HELP!', replies: 0 },
  { id: '3', title: 'А что если написать очень длинное название темы на форуме, то как оно будте отображаться в табличке?', replies: 0 },
  { id: '4', title: 'Название темы', replies: 4 },
  { id: '5', title: 'Еще оодна тема', replies: 1 },
  { id: '6', title: 'Тема форума', replies: 2 },
  { id: '7', title: 'Тема', replies: 8 },
  { id: '8', title: 'Как это работает?', replies: 3 },
  { id: '9', title: 'Кто это все делал?', replies: 7 },
  { id: '10', title: 'Тема форума', replies: 12 },
]

const Forum: FC = () => {

  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure()
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTopics(mockData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Container 
      maxW='700px' 
      p={0}
      color={EColors.WHITE}
    >
      <Grid 
      h='100vh' 
      w='full' 
      templateRows='auto 1fr auto' 
      gap={4}
      >
        <Center pt={20} pb={12}>
          <Heading size='lg'>
            Форум
          </Heading>
        </Center>
        <Box 
          overflowY="auto" 
          maxHeight="auto"
        >
          {loading 
          ? <Center><Spinner/></Center>
          : <ForumTable topicsData={topics}/>
          }
        </Box>
        <Center pb={20} pt={12}>
          <CustomButton 
            width='250px'
            onClick={onOpenCreate}
          >
            Создать тему
          </CustomButton>
        </Center>
      </Grid>
      <Modal 
        isOpen={isOpenCreate} 
        onClose={onCloseCreate}
      >
        <ModalCreateTopic onClose={onCloseCreate} />
      </Modal>
    </Container>
  )
}

export default Forum

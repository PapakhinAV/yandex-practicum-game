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
import { FC } from 'react'
import CustomButton from '../../components/Button/Button'
import { EColors } from '../../App/constants'
import ModalCreateTopic from './ModalCreateTopic'
import { ForumTable } from './components'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { useGetTopicsQuery } from '../../api/forum'


const Forum: FC = () => {
  const topics = useGetTopicsQuery()

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure()

  return (
    <Container
      maxW='700px'
      p={0}
      color={EColors.WHITE}
    >
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>
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
          {topics.isFetching
          ? <Center><Spinner/></Center>
          : <ForumTable topicsData={topics.data}/>
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
        <ModalCreateTopic onClose={() => {
          onCloseCreate()
          topics.refetch()
        }} />
      </Modal>
    </Container>
  )
}

export default Forum

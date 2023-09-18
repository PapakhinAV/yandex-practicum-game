import {
  Center,
  Heading,
  Box,
  Container,
  Spinner,
  Modal,
  useDisclosure
} from '@chakra-ui/react'
import { FC } from 'react'
import CustomButton from '../../components/Button/Button'
import ModalCreateTopic from './ModalCreateTopic'
import { ForumTable } from './components'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { useGetTopicsQuery } from '../../api/forum'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'
import { getThemeColors } from '../../App/constants'


const Forum: FC = () => {
  const topics = useGetTopicsQuery()

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate,
  } = useDisclosure()

  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)

  return (
    <Container
      p={0}
    >
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>

      <Box
        display="grid"
        borderTop='2px solid #ffffff85'
        borderBottom='2px solid #00000085'
        background={themeColors.BACKGROUND}
        backdropFilter="auto"
        backdropBlur='15px'
        gap={30}
        position="absolute"
        top="50%"
        left="50%"
        marginRight="-50%"
        transform="translate(-50%, -50%)"
        borderRadius="12px"
        justifyContent="center"
        padding='60px 70px'
      >
        <Center pb={6}>
          <Heading size='lg'>
            Форум
          </Heading>
        </Center>
        <Box
          overflowY="auto"
          height="400px"
          width="650px"
        >
          {topics.isFetching
          ? <Center><Spinner/></Center>
          : <ForumTable topicsData={topics.data}/>
          }
        </Box>
        <Center pt={12}>
          <CustomButton
            width='250px'
            onClick={onOpenCreate}
          >
            Создать тему
          </CustomButton>
        </Center>
      </Box>
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

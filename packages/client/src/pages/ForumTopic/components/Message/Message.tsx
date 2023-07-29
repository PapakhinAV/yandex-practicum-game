import { 
  HStack,
  VStack,
  Box,
  Text, 
  Avatar,
} from '@chakra-ui/react'
import { FC } from 'react'
import { TMessage, TUser } from '../../types'
import { EColors } from '../../../../App/constants'
import { formatDate } from '../../utils'

interface MessageComponentProps {
  messageData: TMessage;
}

const currentUser: TUser = {
  id: '2',
  first_name: 'Ryan',
  second_name: 'Florence',
  display_name: 'Ryan Florence',
  avatar: 'https://bit.ly/ryan-florence',
  login: 'ryanryanryan'
}

const Message: FC<MessageComponentProps> = ({ messageData }) => {
  const isMine = messageData.user.id === currentUser.id

  const prettyTime = formatDate(messageData.time)

  const justifyValue = isMine ? 'flex-end' : 'flex-start'
  const bgColor = isMine ? EColors.BLUE : EColors.BLACK_ALPHA
  const borderRadiusValue = isMine ? '10px 0px 10px 10px' : '0 10px 10px 10px' 
  const authorFullName = `
    ${messageData.user.first_name || ''} 
    ${messageData.user.second_name || ''}
  `
  
  return (
    <HStack 
      align='flex-start' 
      py={2}
      justify={justifyValue}
    >
      {!isMine && <Avatar
        name={authorFullName}
        src={messageData.user.avatar}
        size="lg"
      />}
      <Box>
        <VStack 
          align='flex-start' 
          bg={bgColor}
          px={3}
          py={2}
          spacing={0.5} 
          borderRadius={borderRadiusValue}
          color={EColors.WHITE}
          maxW='550px'
        >
          {!isMine && <Text color={EColors.LIME}>{messageData.user.display_name}</Text>}
          <Text>{messageData.content}</Text>
          <Text alignSelf='flex-end' fontSize='10px'>{prettyTime}</Text>
        </VStack>
      </Box>
    </HStack>
  )
}

export default Message

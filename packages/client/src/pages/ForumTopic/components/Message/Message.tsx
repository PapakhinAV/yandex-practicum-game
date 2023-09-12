import { 
  HStack,
  VStack,
  Box,
  Text, 
} from '@chakra-ui/react'
import { FC } from 'react'
import { TMessage } from '../../types'
import { EColors } from '../../../../App/constants'
import { formatDate } from '../../utils'

interface MessageComponentProps {
  message: TMessage;
}

const Message: FC<MessageComponentProps> = ({ message }) => {
  return (
    <HStack 
      align='flex-start'
      py={2}
      justifyContent='flex-start'
    >
      <Box>
        <VStack 
          align='flex-start' 
          bg={EColors.BLACK_ALPHA}
          px={3}
          py={2}
          spacing={0.5} 
          borderRadius='0 10px 10px 10px'
          color={EColors.WHITE}
          maxW='550px'
        >
          <Text>{message.user}</Text>
          <Text>{message.content}</Text>
          <Text alignSelf='flex-end' fontSize='10px' m={0}>{formatDate(message.createdAt)}</Text>
        </VStack>
      </Box>
    </HStack>
  )
}

export default Message

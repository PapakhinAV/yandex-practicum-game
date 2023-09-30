import {
  HStack,
  VStack,
  Box,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'
import { TMessage } from '../../types'
import { getThemeColors } from '../../../../App/constants'
import { formatDate } from '../../utils'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/types'
import { sanitize } from '../../../../utils/sanitize'

interface MessageComponentProps {
  message: TMessage;
}

const Message: FC<MessageComponentProps> = ({ message }) => {
  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)

  return (
    <HStack
      align='flex-start'
      py={2}
      justifyContent='flex-start'
    >
      <Box>
        <VStack
          align='flex-start'
          background={themeColors.CONTRAST_BACKGROUND}
          px={3}
          py={2}
          spacing={0.5}
          borderRadius='0 10px 10px 10px'
          color={themeColors.TEXT}
          maxW='550px'
        >
          <Text color={themeColors.USERNAME} m={0}>{sanitize(message.user)}</Text>
          <Text m={0}>{sanitize(message.content)}</Text>
          <Text alignSelf='flex-end' fontSize='10px' m={0}>{formatDate(message.createdAt)}</Text>
        </VStack>
      </Box>
    </HStack>
  )
}

export default Message

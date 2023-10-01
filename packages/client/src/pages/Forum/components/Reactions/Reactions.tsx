import React, { FC } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure
} from '@chakra-ui/react'
import {
  useGetReactionsQuery,
  useAddReactionMutation,
  useDeleteReactionMutation
} from '../../../../api/forum'
import { Reaction } from '..'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../../store/types'
import { getThemeColors } from '../../../../App/constants'
import { MdOutlineAddReaction } from 'react-icons/md'

interface ReactionsComponentProps {
  topicId: number
}

const Reactions: FC<ReactionsComponentProps> = ({ topicId }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [addReaction] = useAddReactionMutation()
  const [deleteReaction] = useDeleteReactionMutation()
  const reactions = useGetReactionsQuery(topicId)

  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)

  const handleReactionAdd = async ({ unified }: EmojiClickData) => {
    await addReaction({ unified, topicId })
    onClose()
  }

  const handleReactionDelete = async (unified: string) => {
    await deleteReaction({ unified, topicId })
  }

  return (
    <Box display="flex" columnGap={4}>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
        isLazy
      >
        <PopoverTrigger>
          <Button 
            fontSize='16px'
            p={0}
            m={0}
            w='28px'
            h='28px'
            minW='28px'
            bgColor='transparent'
            borderWidth='1px'
            borderColor={themeColors.INVERTED_BACKGROUND}
            color={themeColors.TEXT}
            borderRadius='14px'
            _hover={
              {
               bg: themeColors.INVERTED_BACKGROUND,
               color: themeColors.INVERTED_TEXT
              }
            }
          >
            <MdOutlineAddReaction />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <EmojiPicker
            height={320}
            searchDisabled={true}
            skinTonesDisabled={true}
            previewConfig={{
              showPreview: false
            }}
            onEmojiClick={handleReactionAdd}
          />
        </PopoverContent>
      </Popover>
      {
        !reactions.isLoading && reactions?.data
        && reactions.data.map(({ unified, userIds }) => (
          <Reaction unified={unified} userIds={userIds} onClick={handleReactionDelete} />
        ))
      }
    </Box>
  )
}

export default Reactions

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

interface ReactionsComponentProps {
  topicId: number
}

const Reactions: FC<ReactionsComponentProps> = ({ topicId }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [addReaction] = useAddReactionMutation()
  const [deleteReaction] = useDeleteReactionMutation()
  const reactions = useGetReactionsQuery(topicId)

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
          <Button>Добавить реакцию</Button>
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

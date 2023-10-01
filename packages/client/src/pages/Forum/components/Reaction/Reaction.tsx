import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Emoji } from 'emoji-picker-react'
import { Button } from '@chakra-ui/react'
import { IRootState } from '../../../../store/types'
import { getThemeColors } from '../../../../App/constants'
import { MdOutlineAddReaction } from 'react-icons/md'

interface ReactionComponentProps {
  unified: string
  userIds: number[]
  onClick: (unified: string) => void
}

const Reaction: FC<ReactionComponentProps> = ({ unified, userIds, onClick }) => {
  const user = useSelector((state: IRootState) => state.app.user)
  const isUserInUserIds = user?.id && userIds.includes(user.id)

  const currentTheme = useSelector((state: IRootState) => state.app.theme)
  const themeColors = getThemeColors(currentTheme)

  return (
    <Button
      onClick={isUserInUserIds ? () => onClick(unified) : undefined}
      variant={isUserInUserIds ? 'solid' : 'outline'}
      leftIcon={<Emoji unified={unified} size={16} />}
      fontSize='10px'
      borderRadius='20px'
      p='0 10px'
      m={0}
      h='28px'
      minW='20px'
      color={isUserInUserIds ? themeColors.INVERTED_TEXT : themeColors.TEXT}
      borderWidth='1px'
      borderColor={themeColors.INVERTED_BACKGROUND}
      background={isUserInUserIds ? themeColors.INVERTED_BACKGROUND : 'transparent'}
      _hover={
        {
         bg: themeColors.INVERTED_BACKGROUND,
         color: themeColors.INVERTED_TEXT
        }
      }
    >
      {userIds.length}
    </Button>
  )
}

export default Reaction

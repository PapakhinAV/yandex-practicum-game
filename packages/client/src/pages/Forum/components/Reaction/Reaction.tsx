import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Emoji } from 'emoji-picker-react'
import { Button } from '@chakra-ui/react'
import { IRootState } from '../../../../store/types'

interface ReactionComponentProps {
  unified: string
  userIds: number[]
  onClick: (unified: string) => void
}

const Reaction: FC<ReactionComponentProps> = ({ unified, userIds, onClick }) => {
  const user = useSelector((state: IRootState) => state.app.user)
  const isUserInUserIds = user?.id && userIds.includes(user.id)

  return (
    <Button
      onClick={isUserInUserIds ? () => onClick(unified) : undefined}
      variant={isUserInUserIds ? 'solid' : 'outline'}
      leftIcon={<Emoji unified={unified} size={32} />}
    >
      {userIds.length}
    </Button>
  )
}

export default Reaction

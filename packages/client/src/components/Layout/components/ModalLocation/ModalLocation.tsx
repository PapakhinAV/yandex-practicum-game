import React, { FC } from 'react'
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface ModalLocationProps {
  onClose: () => void
  latitude: number | null
  longitude: number | null
}

const ModalLocation: FC<ModalLocationProps> = ({ onClose, latitude, longitude }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Координаты</ModalHeader>
        <ModalBody>
          <p>Широта: {latitude}</p>
          <p>Долгота: {longitude}</p>
        </ModalBody>
      </ModalContent>
    </>
  )
}

export default ModalLocation

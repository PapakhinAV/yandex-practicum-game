import { Box, Spinner } from '@chakra-ui/react'
import { ILoaderProps } from './types'
import { FC } from 'react'

const Loader: FC<ILoaderProps> = ({isLoading}) =>{

  if(!isLoading) return null

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      position="absolute"
      backgroundColor="rgba(0, 0, 0, 0.7)"
      zIndex={100}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Загрузка"
      />
    </Box>
  )
}

export default Loader

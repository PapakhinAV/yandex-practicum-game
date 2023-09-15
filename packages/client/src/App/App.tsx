import { FC } from 'react'
import './App.css'
import { HelmetProvider } from 'react-helmet-async'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './constants'
import { Layout } from '../components'
import Router from '../core/Router/Routes'

const App: FC = () => {

  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Router />
        </Layout>
      </ChakraProvider>
    </HelmetProvider>
  )
}

export default App

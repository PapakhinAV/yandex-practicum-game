import { FC, useEffect } from 'react'
import './App.css'
import { HelmetProvider } from 'react-helmet-async'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './constants'
import { Layout } from '../components'
import Router from '../core/Router/Routes'

const App: FC = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}/api`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
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

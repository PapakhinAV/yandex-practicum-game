import { useEffect } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from '../core/Routes'
import { Layout } from '../components'
import { theme } from './constants'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Router />
      </Layout>
    </ChakraProvider>
  )
}

export default App

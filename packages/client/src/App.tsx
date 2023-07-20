import { useEffect } from 'react'
import './App.css'
import { Router } from './core/Routes'
import { Layout } from './components'

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
    <Layout>
      <Router />
    </Layout>
  )
}

export default App

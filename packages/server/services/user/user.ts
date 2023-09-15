import axios from 'axios'

type TUser = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  avatar: string | null
  email: string
  phone: string
}

export async function getUser(cookie?: string): Promise<TUser | null> {
  try {
    const response = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
      withCredentials: true,
      headers: { cookie }
    })
    
    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log(`Ошибка получения информации о пользователе: ${error}`)
  }

  return null
}

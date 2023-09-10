import axios from 'axios'

type TUser = {
  id: number
  avatar?: string
  display_name?: string
  login: string
  first_name: string
  second_name: string
  email: string
  phone: string
  role?: string
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

import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/forum/topic'
import { Message } from './models/forum/message'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST
} = process.env

const host = process.env.NODE_ENV === 'development' ? 'localhost' : POSTGRES_HOST


export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const client = new Sequelize({
      username: POSTGRES_USER,
      host,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
      models: [Topic, Message]
    })

    await client.sync({ alter: true })
    console.log('👍 Соединение с БД успешно установлено')
    return client
  } catch (e) {
    console.error('🚨 Ошибка при подключении в БД', e)
  }

  return null
}

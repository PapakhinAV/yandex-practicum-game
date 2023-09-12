import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/forum/topic'
import { Message } from './models/forum/message'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const client = new Sequelize({
      username: POSTGRES_USER,
      host:  POSTGRES_HOST || 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
      models: [Topic, Message]
    })

    await client.sync({ alter: true })
    console.log('  ➜ 🎸 Connected to the database')
    return client
  } catch (e) {
    console.error(e)
  }

  return null
}

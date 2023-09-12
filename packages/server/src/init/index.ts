import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const { 
  POSTGRES_USER, 
  POSTGRES_PASSWORD, 
  POSTGRES_DB, 
  POSTGRES_PORT, 
  POSTGRES_HOST 
} = process.env

const host = process.env.NODE_ENV === 'development' ? 'localhost' : POSTGRES_HOST

const sequelizeOptions: SequelizeOptions = {
  host: host,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: []
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('👍 Соединение с БД успешно установлено')
  } catch (error) {
    console.error('🚨 Ошибка при подключении в БД', error)
  }
}

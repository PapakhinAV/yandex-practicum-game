import * as dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const formatDate = (inputDateStr:string) => {
  dayjs.locale('ru')

  const formattedDate = dayjs(inputDateStr).format('D MMMM HH:mm')

  return formattedDate
}

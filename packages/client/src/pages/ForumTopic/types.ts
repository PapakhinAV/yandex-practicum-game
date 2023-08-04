export type TTopic = {
  id: string,
  title: string,
  replies: number,
  userId: string,
}

export type TUser = {
  id: string,
  first_name: string,
  second_name: string,
  display_name: string,
  avatar: string,
  login: string
}

export type TMessage = {
  id: string,
  time: string,
  user: TUser,
  content: string,
}

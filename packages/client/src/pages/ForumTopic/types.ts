export type TTopic = {
  id: string,
  title: string,
  replies: number,
  userId: number,
}

export type TUser = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  avatar: string,
  login: string
}

export type TMessage = {
  id: number,
  createdAt: string,
  user: string,
  content: string,
}

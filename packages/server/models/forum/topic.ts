import { AllowNull, Column, HasMany, Model, NotEmpty, Table } from 'sequelize-typescript'
import { Message } from './message'
import { Reaction } from './reaction'

@Table({ tableName: 'topics' })
export class Topic extends Model {
  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column
  name!: string

  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column
  body!: string

  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column user!: string

  @HasMany(() => Message, 'topicId')
  messages!: Message[]

  @HasMany(() => Reaction, 'topicId')
  reactions!: Reaction[]
}

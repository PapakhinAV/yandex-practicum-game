import { AllowNull, BelongsTo, Column, ForeignKey, Model, NotEmpty, Table } from 'sequelize-typescript'

import { Topic } from './topic'

@Table({ tableName: 'messages' })
export class Message extends Model {
  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column content!: string

  @ForeignKey(() => Topic)
  @Column topicId!: number


  @AllowNull(false)
  @NotEmpty({ msg: 'Поле не может быть пустым' })
  @Column user!: string

  @BelongsTo(() => Topic, 'topicId')
  topic!: Topic
}

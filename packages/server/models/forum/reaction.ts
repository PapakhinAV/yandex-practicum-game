import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { Topic } from './topic'

@Table({ tableName: 'reactions' })
export class Reaction extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  unified!: string

  @PrimaryKey
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topicId!: number

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number

  @BelongsTo(() => Topic, 'topicId')
  topic!: Topic
}

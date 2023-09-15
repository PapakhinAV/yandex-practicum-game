import {
  AllowNull,
  Column,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  DataType,
  ForeignKey,
  Unique
} from 'sequelize-typescript'
import { SiteTheme } from './siteTheme'


@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column(DataType.INTEGER)
  override id!: number

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.STRING)
  theme!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number
}

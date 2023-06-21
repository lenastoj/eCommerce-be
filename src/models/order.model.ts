import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
  NotEmpty,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';
import Article from './article.model';
import { OrderArticle } from './orderArticle.model';

@Table({
  timestamps: true,
  tableName: 'orders',
})
export default class Order extends Model {
  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public declare userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'In review',
  })
  public declare status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public declare amount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  public declare cartId: number;

  @BelongsTo(() => User)
  user: ReturnType<() => User>;

  @BelongsToMany(() => Article, () => OrderArticle)
  public declare articles?: Article[];
}

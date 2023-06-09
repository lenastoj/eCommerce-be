import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import Article from './article.model';
import Cart from './cart.model';

@Table({
  timestamps: true,
  tableName: 'users',
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public declare lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  public declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  public declare isAdmin: boolean;

  @HasMany(() => Article, { onDelete: 'cascade', hooks: false })
  articles?: Article[];

  @HasOne(() => Cart)
  cart: Cart;
}

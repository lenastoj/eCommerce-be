import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Article from './article.model';
import Cart from './cart.model';

@Table({
  timestamps: false,
  tableName: 'cartArticle',
})
export class CartArticle extends Model {
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1
  })
  public declare quantity: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  public declare cartId: number;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public declare articleId: number;
}

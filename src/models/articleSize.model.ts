import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Article from './article.model';
import Size from './size.model';

@Table({
  timestamps: false,
  tableName: 'articleSize',
})
export class ArticleSize extends Model<ArticleSize> {
  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public declare articleId: number;

  @ForeignKey(() => Size)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public declare sizeId: number;
}

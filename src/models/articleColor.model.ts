import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Article from './article.model';
import Color from './color.model';

@Table({
  timestamps: false,
  tableName: 'articleColor',
})
export class ArticleColor extends Model<ArticleColor> {
  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public declare articleId: number;

  @ForeignKey(() => Color)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public declare colorId: number;
}

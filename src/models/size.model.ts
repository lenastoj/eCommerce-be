import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import Article from './article.model';
import { ArticleSize } from './articleSize.model';

@Table({
  timestamps: true,
  tableName: 'sizes',
})
export default class Size extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  public declare sizeShoe: number;

  @BelongsToMany(() => Article, () => ArticleSize)
  public declare articles?: Article[];
}

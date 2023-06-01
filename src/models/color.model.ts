import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import Article from './article.model';
import { ArticleColor } from './articleColor.model';

@Table({
  timestamps: true,
  tableName: 'colors',
})
export default class Color extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public declare name: string;

  @BelongsToMany(() => Article, () => ArticleColor)
  public declare articles?: Article[];
}

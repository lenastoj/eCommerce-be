import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import Color from './color.model';
import Size from './size.model';
import { ArticleColor } from './articleColor.model';
import { ArticleSize } from './articleSize.model';

@Table({
  timestamps: true,
  tableName: 'articles',
})
export default class Article extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public declare imageUrl: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  public declare price: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  public declare inStock: boolean;

  @Column({
    type: DataType.ENUM('man', 'woman'),
    allowNull: false,
  })
  public declare gender: 'man' | 'woman';

  @BelongsToMany(() => Color, () => ArticleColor)
  public declare colors: Color[];

  @BelongsToMany(() => Size, () => ArticleSize)
  public declare sizes: Size[];
}

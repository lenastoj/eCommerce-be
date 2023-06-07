import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  AllowNull,
  NotEmpty,
} from 'sequelize-typescript';
import Color from './color.model';
import Size from './size.model';
import { ArticleColor } from './articleColor.model';
import { ArticleSize } from './articleSize.model';
import User from './user.model';

@Table({
  timestamps: true,
  tableName: 'articles',
})
export default class Article extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  imageUrl: string;

  @Column(DataType.DOUBLE)
  price: number;

  @Column(DataType.BOOLEAN)
  inStock: boolean;

  @Column(DataType.ENUM('man', 'woman'))
  gender: 'man' | 'woman';

  @BelongsToMany(() => Color, () => ArticleColor)
  colors: Color[];

  @BelongsToMany(() => Size, () => ArticleSize)
  sizes: Size[];

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: ReturnType<() => User>;
}

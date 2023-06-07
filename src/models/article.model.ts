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
  public declare name: string;

  @Column(DataType.TEXT)
  public declare description: string;

  @Column(DataType.STRING)
  public declare imageUrl: string;

  @Column(DataType.DOUBLE)
  public declare price: number;

  @Column(DataType.BOOLEAN)
  public declare inStock: boolean;

  @Column(DataType.ENUM('man', 'woman'))
  public declare gender: 'man' | 'woman';

  @BelongsToMany(() => Color, () => ArticleColor)
  public declare colors: Color[];

  @BelongsToMany(() => Size, () => ArticleSize)
  public declare sizes: Size[];

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public declare userId: number;

  @BelongsTo(() => User)
  user: ReturnType<() => User>;
}

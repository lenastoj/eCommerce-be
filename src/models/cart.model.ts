import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  AllowNull,
  NotEmpty,
  BelongsToMany,
} from 'sequelize-typescript';
import User from './user.model';
import Article from './article.model';
import { CartArticle } from './cartArticle.model';

@Table({
  timestamps: true,
  tableName: 'carts',
})
export default class Cart extends Model {

    @AllowNull(false)
    @NotEmpty
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    public declare userId: number;

    @BelongsToMany(() => Article, () => CartArticle,  )
    public declare articles?: Article[];
}

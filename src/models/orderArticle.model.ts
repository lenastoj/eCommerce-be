import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
  } from 'sequelize-typescript';
  import Article from './article.model';
import Order from './order.model';
  
  @Table({
    timestamps: false,
    tableName: 'orderArticle',
  })
  export class OrderArticle extends Model {
    @Column({
      type: DataType.INTEGER,
      defaultValue: 1
    })
    public declare quantity: number;
  
    @ForeignKey(() => Order)
    @Column({
      type: DataType.INTEGER,
    })
    public declare orderId: number;
  
    @ForeignKey(() => Article)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    public declare articleId: number;
  }
  
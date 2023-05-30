import { Table, Model, Column, DataType } from 'sequelize-typescript';


@Table({
  timestamps: true,
  tableName: 'users',
})
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare public firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare public lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare public email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare public password: string;
}




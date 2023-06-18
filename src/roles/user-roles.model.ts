import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript'
import { User } from 'src/users/user.model'
import { Role } from './roles.model'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @ApiProperty({ example: '1', description: 'Уникальный ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: '1', description: 'Уникальный ID role' })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER
  })
  idRole: number

  @ApiProperty({ example: '1', description: 'Уникальный ID user' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  idUser: number
}

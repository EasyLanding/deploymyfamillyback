import { ApiProperty } from '@nestjs/swagger'
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model'
import { UserRoles } from 'src/roles/user-roles.model'

interface UserCreationAttrs {
  email: string
  password: string
  phone: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ApiProperty({ example: 'ddd@mail.ru', description: 'Email пользователя' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  })
  email: string

  @ApiProperty({ example: '111УУккук!!22', description: 'Пароль Юзера' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      min: 10
    }
  })
  password: string

  @ApiProperty({
    example: '+799999999',
    description: 'Уникальный номер телефона'
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /^\+[7]{1}[1-9]{3}[0-9]{7}$/
    }
  })
  phone: string

  @ApiProperty({
    example: 'nickname',
    description: 'Уникальный nickname'
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /^[A-Za-z0-9]{0,15}$/
    }
  })
  nickname: string

  @ApiProperty({
    example: 'Имя',
    description: 'Имя'
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
    validate: {
      is: /[^а-яёА-ЯЁ]{0,15}/
    }
  })
  name: string

  @ApiProperty({
    example: 'Фамилия',
    description: 'Иванов'
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '',
    validate: {
      is: /[^а-яёА-ЯЁ]{0,15}/
    }
  })
  lastname: string

  @ApiProperty({
    example: 'true',
    description: 'Статус true пользователь забанен, false нет'
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  banned: boolean

  @ApiProperty({
    example: 'Спам',
    description: 'Причина блокировки текстовый месседж'
  })
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string

  @BelongsToMany(() => Role, () => UserRoles)
  role: Role[]
}

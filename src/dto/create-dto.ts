import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'ddd@mail.ru', description: 'Email пользователя' })
  readonly email: string

  @ApiProperty({ example: '111УУккук!!22', description: 'Пароль Юзера' })
  readonly password: string

  @ApiProperty({
    example: '799999999',
    description: 'Уникальный номер телефона'
  })
  readonly phone: string

  @ApiProperty({
    example: 'nickname',
    description: 'Уникальный никнейм'
  })
  readonly nickneim: string

  @ApiProperty({
    example: 'Имя',
    description: 'Имя'
  })
  readonly name: string

  @ApiProperty({
    example: 'Фамилия',
    description: 'Фамилия'
  })
  readonly lastname: string
}

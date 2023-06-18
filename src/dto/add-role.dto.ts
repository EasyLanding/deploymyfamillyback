import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
  @ApiProperty({
    example: 'value',
    description: 'Роль из базы данных с ролями ADMIN USER и тд'
  })
  readonly value: string

  @ApiProperty({
    example: 'id',
    description: 'Уникальный id user'
  })
  readonly userId: number
}

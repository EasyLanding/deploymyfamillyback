import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
  @ApiProperty({ example: 'Название роли', description: 'Админ' })
  readonly value: string

  @ApiProperty({ example: 'Описание роли', description: 'Администрирование' })
  readonly description: string
}

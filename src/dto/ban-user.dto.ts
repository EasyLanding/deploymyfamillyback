import { ApiProperty } from '@nestjs/swagger'

export class BanUserDto {
  @ApiProperty({
    example: 'id',
    description: 'Уникальный id user'
  })
  readonly userId: number

  @ApiProperty({
    example: 'Причина блокировки',
    description: 'Плохой админу не понравился'
  })
  readonly banReason: string
}

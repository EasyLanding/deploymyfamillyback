import { Controller, Post } from '@nestjs/common'
import { Body } from '@nestjs/common/decorators'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/dto/create-dto'
import { AuthService } from './auth.service'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}

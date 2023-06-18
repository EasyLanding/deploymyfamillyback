import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist'
import { CreateUserDto } from '../dto/create-dto'
import { User } from './user.model'
import { UsersService } from './users.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/role-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { AddRoleDto } from 'src/dto/add-role.dto'
import { BanUserDto } from 'src/dto/ban-user.dto'

@ApiTags('Юзеры')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание Юзера' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получить всех Юзеров' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto)
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  banReason(@Body() dto: BanUserDto) {
    return this.userService.banReason(dto)
  }
}

import { Injectable } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums'
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt/dist'
import { CreateUserDto } from 'src/dto/create-dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email)
    const phoneCandidate = await this.userService.getUsersByPhone(userDto.phone)
    if (candidate || phoneCandidate) {
      throw new HttpException(
        'Пользователь с таким email или тлф уже существует',
        HttpStatus.BAD_REQUEST
      )
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword
    })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      phone: user.phone,
      name: user.name,
      nickname: user.nickname,
      lastname: user.lastname,
      id: user.id,
      role: user.role
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email)
    const phoneUser = await this.userService.getUsersByPhone(userDto.phone)
    const pass = await bcrypt.compare(userDto.password, user.password)

    if (user && phoneUser && pass) {
      return user
    }
    throw new UnauthorizedException({
      message: 'Не верный пароль имеил или номер тлф'
    })
  }
}

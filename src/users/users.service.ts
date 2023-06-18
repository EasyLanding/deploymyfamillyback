import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { CreateUserDto } from '../dto/create-dto'
import { User } from './user.model'
import { AddRoleDto } from 'src/dto/add-role.dto'
import { BanUserDto } from 'src/dto/ban-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('ADMIN')
    await user.$set('role', [role.id])
    user.role = [role]
    return user
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } })
    return users
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    })
    return user
  }
  async getUsersByPhone(phone: string) {
    const user = await this.userRepository.findOne({
      where: { phone },
      include: { all: true }
    })
    return user
  }
  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)
    if (user && role) {
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND
    )
  }
  async banReason(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    if (!user)
      throw new HttpException('Пользователь найден', HttpStatus.NOT_FOUND)
    user.banned = true
    user.banReason = dto.banReason
    await user.save()
    return user
  }
}

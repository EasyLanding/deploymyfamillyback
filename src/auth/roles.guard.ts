import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './role-auth.decorator'
import { CreateRoleDto } from 'src/dto/create-role-dto'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requeredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      )
      if (!requeredRoles) return true
      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Нет дсотупа', HttpStatus.FORBIDDEN)
      }
      const user = this.jwtService.verify(token)
      req.user = user
      return user.role.some((roles: CreateRoleDto) =>
        requeredRoles.includes(roles.value)
      )
    } catch (e) {
      throw new HttpException('Нет дсотупа', HttpStatus.FORBIDDEN)
    }
  }
}

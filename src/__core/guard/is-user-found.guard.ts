import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { httpMessage } from "../messages";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class IsUserFoundGuard implements CanActivate {
    constructor(private readonly userSerivce: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.userSerivce.findUserById(request.user.id);
    if(!user) {
        throw new BadRequestException(httpMessage["0F001"]);
    }
    return true;
  }
}

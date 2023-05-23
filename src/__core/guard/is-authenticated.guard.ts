import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { httpMessage } from '../messages';
import "dotenv/config";

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException(httpMessage["0A006"]);
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          { secret: process.env.JWT_SECRET }
        );
        request['user'] = payload;
      } catch (error) {
        if(error?.message === "invalid signature") {
            throw new UnauthorizedException(httpMessage["0A005"]);
        }
        if(error?.message === "jwt expired") {
            throw new UnauthorizedException(httpMessage["0A003"]);
        }
        throw new UnauthorizedException(httpMessage["0A001"]);
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
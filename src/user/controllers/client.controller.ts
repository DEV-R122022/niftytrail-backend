import { Controller, Get, HttpCode, UseGuards, Version } from '@nestjs/common';
import { UserService } from '../user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../__core/guard/is-authenticated.guard';
import { IsUserFoundGuard } from '../../__core/guard/is-user-found.guard';

@ApiTags("Client")
@Controller('clients')
export class ClientController {
  constructor(private readonly userService: UserService) {}

  @Version("1")
  @HttpCode(201)
  @UseGuards(AuthGuard, IsUserFoundGuard)
  @Get("/me")
  me() {
    return this.userService.findAll();
  }
}

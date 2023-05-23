import { Controller, Get, Post, Body, Patch, Param, Delete, Version, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version("1")
  @HttpCode(201)
  @Post("/register")
  createAccount(@Body() body: CreateUserDto) {
    return this.authService.createAccount(body);
  }

  @Version("1")
  @HttpCode(201)
  @Post("/login")
  loginAccount(@Body() body: any) {
    return this.authService.loginAccount(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

import { Controller, Post, UseGuards, Request, Body, Get, UnsupportedMediaTypeException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard) // Aplicar guard de autenticación local
  @Post('login')
  async login(@Request() req) {
    // req.user viene de la estrategia local
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Excluir password de la respuesta
    const { password, ...result } = user.toObject();
    return result;
  }

  
}


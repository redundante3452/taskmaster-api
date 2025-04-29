import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ){}
    
    @Get('all')
    async getAllUsers() {
        return this.userService.findAllUsers();
    }

    @UseGuards(JwtAuthGuard) 
    @Get('search')
    async findByEmail(@Query('email') email: string) {
       const user = await this.userService.findByEmail(email);
        // Eliminamos la contraseña antes de devolver el resultado
        const { password, ...result } = user.toObject();
        return result;
    }

    


}

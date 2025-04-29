import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService { 

    constructor(
       private usersService: UsersService,
       private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        return this.usersService.validateUser(email, password);
        
    }

    async getUserById(user: any): Promise<any>{
        const payload = {email: user.email, sub: user._id};
        return this.usersService.findById(user._id);
    }

    async login(user: any){
        const payload = { email: user.email, sub: user._id };


        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        };
    }
}

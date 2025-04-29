import { Injectable, ConflictException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User,UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,

    ){}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({email: createUserDto.email}).exec();
        if (existingUser){
            throw new ConflictException('El email ya está en uso');
        }
        

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();

    }

      async findByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email }).exec();

        if (!user) {
            throw new NotFoundException(`Usuario con email ${email} no encontrado`);
        }

        return user;
    }


    async findById(id: string): Promise<User>{
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new NotAcceptableException(`Usuario con id ${id} no encontrado`)
        }
        return user

    }

    async findAllUsers(): Promise<UserDocument[]>{
        const users = await this.userModel.find().select('email name _id').exec();

        if (!users) {
            throw new NotAcceptableException('No hay usuarios registrados')
        }
        return users
    }

    
    async validateUser(email: string, password: string): Promise<any>{
        try{
            const user = await this.userModel.findOne({ email }).exec();

            if (!user){
                return null;
            }

            const iSPasswordValid = await bcrypt.compare(password, user.password)

            if(!iSPasswordValid){
                return null
            }
            
            const { password: _, ...result } = user.toObject();
            return result;

        }

        catch (error){
            return null
        }

    

    }


}

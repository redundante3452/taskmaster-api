import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true})
    name: string;

    @Prop({required:true})
    email: string;

    @Prop({required:true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next){
   const user =this;
   
   if(!user.isModified('password')) return next();

   try{
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    next();

   } catch (error) {
       next(error);
   }
   
});


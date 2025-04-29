import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ required:true })
    title: string

    @Prop({ required:true })
    description: string

    @Prop({ default: false })
    completed: boolean

    @Prop({ type: Date })
    dueDate: Date;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId

}

export const TaskSchema = SchemaFactory.createForClass(Task)

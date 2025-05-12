import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: '#3498db' }) // Color azul por defecto
    color: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
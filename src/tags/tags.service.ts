import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(Tag.name) private tagModel: Model<TagDocument>
    ){}

    async create(createTagDto: CreateTagDto, userId: string): Promise<TagDocument>{
        const existingTag  = await this.tagModel.findOne({
            name: createTagDto.name,
            user: userId
        }).exec()

        if (existingTag ) {
            throw new ConflictException(`Ya existe una etiqueta llamada "${createTagDto.name}"`);
        }

        const newTag = new this.tagModel({
            ...createTagDto,
            user: userId
        });
        
        return newTag.save();

    }

    async findAll(userId: string): Promise<TagDocument[]>{
        const tag = await this.tagModel.find({ user: userId }).exec()
        return tag
    }

    async findOne(id: string, userId: string): Promise<TagDocument> {
        const tag = await this.tagModel.findOne({ _id: id, user: userId }).exec()

        if(!tag){
            throw new NotFoundException(`Etiqueta con ID ${id} no encontrada o no tienes permiso`);
        }

        return tag
    }

    async update(id: string, userId: string, updateTagDto: UpdateTagDto): Promise<TagDocument> {
        
        if (updateTagDto.name){
            const existingTag = await this.tagModel.findOne({
                name: updateTagDto.name,
                user: userId,
                _id: {$ne: id}
            }).exec()

            if (existingTag) {
                throw new ConflictException(`Ya existe una etiqueta llamada "${updateTagDto.name}"`);
            }
        }

        const updatedTag = await this.tagModel.findOneAndUpdate(
            {_id: id, user: userId},
            updateTagDto,
            { new: true }
        ).exec();

        if (!updatedTag) {
            throw new NotFoundException(`Etiqueta con ID ${id} no encontrada o no tienes permiso`);
        }
        return updatedTag

    }


}

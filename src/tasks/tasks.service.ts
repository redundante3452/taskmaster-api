import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>
    ){}

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskDocument> {
        const createdTask = new this.taskModel({
            ...createTaskDto,
            user: userId
        });
        return createdTask.save()
    }

    async findAll(userId:string): Promise<TaskDocument[]>{
        const task = this.taskModel.find({user: userId}).exec()
        if(!task){
            throw new NotAcceptableException('notas no encontradas')
        }
        return task

    }

    async findOne(userId:string, id:string): Promise<TaskDocument>{
        const task = await this.taskModel.findById({ _id: id, user:userId }).exec()
        if(!task){
            throw new NotFoundException('Tarea no encontrada')
        }
        return task
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<TaskDocument>{
        const updatedTask = await this.taskModel.findOneAndUpdate(
            { _id: id, user: userId },
            updateTaskDto,
            { new: true},

        ).exec();

        if(!updatedTask){
            throw new NotFoundException('tarea no encontrada')
        }
        return updatedTask

    }

    async remove(id: string, userId:string): Promise<TaskDocument>{
        const removeTask = await this.taskModel.findByIdAndDelete(
            {_id: id, user: userId},
        ).exec()

        if(!removeTask){
            throw new NotFoundException ('La tarea no se encontro o n tienes permiso para eliminarla')
        }

        return removeTask
    }

    async findCompletedTasks(userId:string):Promise<TaskDocument[]>{
        return this.taskModel.find({ user: userId, completed: true }).exec()
    }

    async findPendingTasks(userId:string): Promise<TaskDocument[]>{
        return this.taskModel.find( { user: userId, completed: false }).exec()
    }

}

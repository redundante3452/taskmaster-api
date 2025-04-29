import { 
    Controller, Get, Post, Body, Patch, Param, Delete, 
    UseGuards, Request, Query 
  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Request() req){
        return this.tasksService.create(createTaskDto, req.user.userId)
    }

    
}

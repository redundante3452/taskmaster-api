import { 
    Controller, Get, Post, Body, Patch, Param, Delete, 
    UseGuards, Request, Query 
  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto, @Request() req){
        return this.tasksService.create(createTaskDto, req.user.userId)
    }

    @Get()
    findAll(@Request() req, @Query('completed') completed?: string){
        if(completed == undefined){
            const isCompleted = completed == 'true';
            return isCompleted
            ? this.tasksService.findCompletedTasks(req.user.userId)
            : this.tasksService.findPendingTasks(req.user.userId)
        }

        return this.tasksService.findAll(req.user.userId);  
    }

    @Get('status/completed')
    findCompleted(@Request() req){
        return this.tasksService.findCompletedTasks(req.user.userId)
    }

    @Get('status/pending')
    findPending(@Request() req){
        return this.tasksService.findPendingTasks(req.user.userId)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.tasksService.findOne(id, req.user.userId)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
        @Request() req
    ) {
        return this.tasksService.update(id, updateTaskDto, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req){
        return this.tasksService.remove(id, req.user.userId)
    }
    
    



    
}

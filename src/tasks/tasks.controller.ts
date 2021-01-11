import { TasksService } from './tasks.service';
// tslint:disable-next-line:max-line-length
import { Controller, ParseIntPipe, Get , Param, UsePipes, Post, ValidationPipe, Body, Delete, Patch, Query} from '@nestjs/common'; // ,  , Post, Body, , Delete, Patch, UsePipes, ValidationPipe
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValdiationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor( private tasksService: TasksService ) { }

    @Get()
    @UsePipes(ValidationPipe)
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id' , ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.tasksService.createTask( createTaskDto );
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id' , ParseIntPipe) id: number ,
        @Body('status' , TaskStatusValdiationPipe) status: TaskStatus ,
        ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id , status);
    }

    @Delete('/:id')
    deleteTask(@Param('id' , ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

}

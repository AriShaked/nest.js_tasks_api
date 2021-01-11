import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common'; // NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }
    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
      return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ${id} not found `);
        } else {
            return found;
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       return await this.taskRepository.createTask(createTaskDto);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        console.log(result);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with id: ${id} not found `);
        }
    }
}

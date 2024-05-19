import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './models/task';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<Task>,
    private userService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, id: string): Promise<Task> {
    try {
      const user = await this.userService.findOne(id)

      if (!user) {
        throw new HttpException("User doesnt exist", HttpStatus.BAD_REQUEST)
      }

      const task = new this.taskModel({
        ...createTaskDto,
        user: user._id,

      });

      await task.save();

      return task;


    } catch (err) {
      this.logger.error(err.message, err.stack);

      // Rethrow the error to propagate it
      throw err;
    }
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

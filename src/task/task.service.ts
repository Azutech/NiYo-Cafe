import {
  Injectable,
  HttpException,
  NotFoundException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
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
      const user = await this.userService.findOne(id);

      if (!user) {
        throw new HttpException('User doesnt exist', HttpStatus.BAD_REQUEST);
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

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find().exec();

      if (!tasks || tasks.length === 0) {
        throw new HttpException(
          'Task can not be retrieved',
          HttpStatus.BAD_REQUEST,
        );
      }
      return tasks;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      // Rethrow the error to propagate it
      throw err;
    }
  }

  async getTasksForUser(userId: string): Promise<Task[]> {
    try {
      const tasks = await this.taskModel.find({ user: userId }).exec();

      if (!tasks || tasks.length === 0) {
        throw new HttpException(
          'Task can not be retrieved',
          HttpStatus.BAD_REQUEST,
        );
      }
      return tasks;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      // Rethrow the error to propagate it
      throw err;
    }
  }

  async findOne(userId: string) {
    try {
      const tasks = await this.taskModel.findOne({ _id: userId }).exec();

      if (!tasks) {
        throw new HttpException(
          'Task can not be retrieved',
          HttpStatus.BAD_REQUEST,
        );
      }
      return tasks;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      // Rethrow the error to propagate it
      throw err;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.taskModel
        .findByIdAndUpdate(id, updateTaskDto, { new: true })
        .exec();
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      // Rethrow the error to propagate it
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.taskModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (err) {
      this.logger.error(err.message, err.stack);
      // Rethrow the error to propagate it
      throw err;
    }
  }
}

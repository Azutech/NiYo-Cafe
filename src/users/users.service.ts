import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/model/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return this.userModel.findOne({ id }).exec();
  }
  async findsub(sub: string) {
    return this.userModel.findOne({_id: sub }).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findByCode(verificationCode: string): Promise<User | null> {
    return this.userModel.findOne({ verificationCode }).exec();
  }
  async activateAccount(
    id: string,
    status: string,
    verificationCode: string,
    isVerified: boolean,
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: { status: 'Active', isVerified: true },
        $unset: { verificationCode: 1 },
      }, // Remove the 'token' field
      { new: true },
    );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

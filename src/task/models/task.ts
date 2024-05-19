import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/model/users';
import * as mongoose from 'mongoose';

export enum Status {
  Active = 'Active',
  Pending = 'Pending',
}

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: false })
  isCompleted: Boolean;
  @Prop({ default: Status.Pending, enum: Status })
  status: Status;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

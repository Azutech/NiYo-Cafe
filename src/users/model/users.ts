import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Status {
  Active = 'Active',
  Pending = 'Pending',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: Status.Pending, enum: Status })
  status: Status;
  @Prop({ required: true })
  verificationCode: string;
  @Prop({ required: true })
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// password.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds: number = 10;

  // Function to hash a password
  async hashPassword(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, this.saltRounds);
      return hash;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to hash password');
    }
  }

  // Function to compare a password with its hash
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to compare passwords');
    }
  }
}

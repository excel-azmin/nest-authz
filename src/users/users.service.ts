import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './interface/user.interface';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<UserInterface>){}

  async create(createUserDto: CreateUserDto) {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save()
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userModel: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    if (await this.checkUserByEmail(email)) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
      return await this.userModel.save(createUserDto);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    if (!users || users.length === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.getSingleUserByID(id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.getSingleUserByID(id);
    if (existingUser) {
      const { affected } = await this.userModel.update(id, updateUserDto);
      console.log(affected);
      if (affected) {
        return await this.getSingleUserByID(id);
      } else {
        throw new HttpException('User not modified', HttpStatus.NOT_MODIFIED);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkUserByEmail(email) {
    const userExist = await this.userModel.find({ where: { email } });
    return userExist.length > 0;
  }

  async getSingleUserByID(id) {
    const user = await this.userModel.findOneBy({ _id: new ObjectId(id) });
    return user;
  }
}

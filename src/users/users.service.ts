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

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ status: HttpStatus; message: string; user?: User }> {
    const { email } = createUserDto;
    const userExist = await this.userModel.findOne({ where: { email } });

    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    } else {
      const newUser = await this.userModel.save(createUserDto);
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        user: newUser,
      };
    }
  }

  async findAll(): Promise<{
    status: HttpStatus;
    message: string;
    users?: User[];
  }> {
    const users = await this.userModel.find();

    if (!users || users.length === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { status: HttpStatus.OK, message: 'Users found', users };
  }

  async findOne(
    id: string,
  ): Promise<{ status: HttpStatus; message: string; user?: User }> {
    const user = await this.getSingleUserByID(id);

    if (user) {
      return { status: HttpStatus.OK, message: 'User found', user };
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ status: HttpStatus; message: string; user?: User }> {
    const existingUser = await this.getSingleUserByID(id);

    if (existingUser) {
      const { affected } = await this.userModel.update(id, updateUserDto);

      console.log(affected);

      if (affected === 1) {
        const updatedUser = await this.getSingleUserByID(id);
        return {
          status: HttpStatus.OK,
          message: 'User updated successfully',
          user: updatedUser,
        };
      } else if (affected == 0) {
        return {
          status: HttpStatus.NOT_MODIFIED,
          message: 'User data not modified',
        };
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(
    id: string,
  ): Promise<{ status: HttpStatus; message: string; deletedUser?: User }> {
    const user = await this.getSingleUserByID(id);

    if (user) {
      const deletedUser = await this.userModel.delete(id);

      if (deletedUser.affected === 1) {
        return {
          status: HttpStatus.OK,
          message: `User #${id} has been successfully deleted`,
          deletedUser: user,
        };
      }
    }

    return {
      status: HttpStatus.NOT_FOUND,
      message: `User #${id} not found or could not be deleted`,
    };
  }

  async checkUserByEmail(email) {
    const userExist = await this.userModel.find({ where: { email } });
    return userExist.length > 0;
  }

  async getSingleUserByID(id) {
    const user = await this.userModel.findOne({
      where: { _id: new ObjectId(id) },
    });
    return user;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserApiResponses } from 'src/swagger-docs/user/user-responses';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UserApiResponses.CreateAndGetSingleUserSuccess()
  @UserApiResponses.InternalServerError()
  @UserApiResponses.UserAlreadyExists()
  @UserApiResponses.InternalServerError()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UserApiResponses.AllUsersRetrieved()
  @UserApiResponses.NoUsersFound()
  @UserApiResponses.InternalServerError()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UserApiResponses.UserNotFoundError()
  @UserApiResponses.CreateAndGetSingleUserSuccess()
  @UserApiResponses.InvalidDataProvided()
  @UserApiResponses.InternalServerError()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UserApiResponses.UpdateUserSuccess()
  @UserApiResponses.UpdateUserNotModified()
  @UserApiResponses.UserNotFoundError()
  @UserApiResponses.InvalidDataProvided()
  @UserApiResponses.InternalServerError()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':oid')
  @UserApiResponses.UserDeletedSuccessfully()
  @UserApiResponses.UserNotFoundError()
  @UserApiResponses.InvalidDataProvided()
  @UserApiResponses.InternalServerError()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

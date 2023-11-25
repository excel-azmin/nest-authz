import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { UserApiResponses } from 'src/swagger-docs/user/user-responses';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UserApiResponses.AllUsersRetrieved()
  @UserApiResponses.NoUsersFound()
  @UserApiResponses.InternalServerError()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User)
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

  @Delete(':id')
  @Roles(Role.Admin)
  @UserApiResponses.UserDeletedSuccessfully()
  @UserApiResponses.UserNotFoundError()
  @UserApiResponses.InvalidDataProvided()
  @UserApiResponses.InternalServerError()
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

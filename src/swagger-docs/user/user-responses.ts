import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ErrorResponseDto } from '../dto/error-response-dto';
import { InternalServerErrorResponseDto } from '../dto/internal-server-error-response-dto';
import { UserNotFoundResponseDto } from '../dto/not-found-response-dto';

export const UserApiResponses = {
  CreateAndGetSingleUserSuccess: () =>
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User created successfully.',
      type: CreateUserDto,
    }),

  AllUsersRetrieved: () =>
    ApiResponse({
      status: HttpStatus.OK,
      description: 'All users retrieved successfully.',
      type: [CreateUserDto], // Assuming UserDto represents user data
    }),

  NoUsersFound: () =>
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'No users found.',
      type: [UserNotFoundResponseDto],
    }),

  UpdateUserSuccess: () =>
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User updated successfully.',
      type: UpdateUserDto, // Define the type of the response
    }),

  UpdateUserNotModified: () =>
    ApiResponse({
      status: HttpStatus.NOT_MODIFIED,
      description: 'User data not modified.',
      type: UpdateUserDto, // Define the type of the response
    }),

  InvalidDataProvided: () =>
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid data provided.',
      type: ErrorResponseDto,
    }),

  UserAlreadyExists: () =>
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User already exists',
      type: CreateUserDto,
    }),

  InternalServerError: () =>
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error',
      type: InternalServerErrorResponseDto,
    }),

  UserNotFoundError: () =>
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
      type: UserNotFoundResponseDto,
    }),
  UserDeletedSuccessfully: () =>
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User deleted successfully.',
    }),
};

import { ApiHeaders, ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

@ApiTags('User')
export class CreateUserDto {
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    @ApiProperty({ example: 'Shaid', description: 'First name of a person' })
    readonly first_name: string;
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    @ApiProperty({ example: 'Azmin', description: 'Last name of a person' })
    readonly last_name: string;
    @IsString()
    @MaxLength(30)
    @ApiProperty({ example: 'Shaid Azmin', description: 'Full name of a person' })
    readonly full_name: string;
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'azmin@exampl.com', description: 'Last name of a person' })
    readonly email: string;

}

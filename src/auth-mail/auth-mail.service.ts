import { MailerService } from '@nestjs-modules/mailer';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/common/constants/constants';
import { mail } from 'src/config/mail-config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthMailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const payload = {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        roles: createUserDto.roles,
        email: createUserDto.email,
        password: createUserDto.password,
      };

      const access_token = await this.jwtService.signAsync(payload);

      await this.mailService.sendMail({
        to: createUserDto.email,
        from: mail.user,
        subject: 'Registration Verification',
        text: 'Registration Verification mail',
        html: `
          <p>Hi there!</p>
          <p>Please verify your registration by clicking the link below:</p>
          <a href="http://localhost:3000/auth-mail/verify?token=${access_token}">Verify Email</a>
        `,
      });

      return {
        statusCode: HttpStatus.ACCEPTED,
        message: 'Verification email sent successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to send verification email',
      };
    }
  }

  async verify(token) {
    const tokenVerification = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    if (tokenVerification) {
      const user = await this.authService.create(tokenVerification);

      return user;
    }
    return tokenVerification;
  }
}

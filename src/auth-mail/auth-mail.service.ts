import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { mail } from 'src/config/mail-config';
import { CreateAuthMailDto } from './dto/create-auth-mail.dto';
import { UpdateAuthMailDto } from './dto/update-auth-mail.dto';

@Injectable()
export class AuthMailService {
  constructor(private readonly mailService: MailerService) {}

  async create(createAuthMailDto: CreateAuthMailDto) {
    this.mailService
      .sendMail({
        to: createAuthMailDto.email,
        from: mail.user,
        subject: 'NESTJS Mail',
        text: 'Forgot Password',
        html: `Hi there!<br><br>' +
          createAuthMailDto.email +
          ' <br><br> What’s a better name for Frontend Developers?<br><br> <b> <div>elopers </b>`,
      })
      .then((info) => {
        console.log(info);
      })
      .catch((error) => {
        console.log(error);
      });

    return 'success';
  }

  findAll() {
    return `This action returns all authMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authMail`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAuthMailDto: UpdateAuthMailDto) {
    return `This action updates a #${id} authMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} authMail`;
  }
}

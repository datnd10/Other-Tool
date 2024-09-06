import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, Req, Res, Session, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserEntity } from './user.entity';
import { User } from './user.decorator';
import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/files',
      filename(req, file, callback) {
        callback(null, file.originalname);
      },
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }


  @Post('upload-png')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/files',
      filename(req, file, callback) {
        callback(null, file.originalname);
      },
    })
  }))
  uploadFilePNG(@UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({ fileType: 'png' }).addMaxSizeValidator({ maxSize: 1024 * 1024 }).build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })) file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/user/:id')
  findOne(
    @User()
    user: UserEntity,
  ) {
    console.log(user);
    return user;
  }

  @Get('get-cookie')
  finndAll(@Req() req: Request) {
    console.log(req.cookies);
    return req.cookies;
  }

  @Get('set-cookie')
  setCookie(
    @Res({ passthrough: true })
    response: Response,
  ) {
    response.cookie(
      'userId',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    );
    response.send('Cookie Saved Successfully');
  }

  @Get('login')
  loginUser(@Session() session: Record<string, any>) {
    session.user = { id: 1, username: 'Jane' };
    return 'LoggedIn';
  }

  @Get('profile')
  profile(@Session() session: Record<string, any>) {
    const user = session.user;
    if (user) {
      return `Hello, ${user.username}`;
    } else {
      return 'Not logged in';
    }
  }
}

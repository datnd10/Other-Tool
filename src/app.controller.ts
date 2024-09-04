import { Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
}

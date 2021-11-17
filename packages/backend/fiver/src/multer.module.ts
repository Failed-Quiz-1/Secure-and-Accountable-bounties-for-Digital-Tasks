import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const multerModule = MulterModule.register({
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      // Allow storage of file
      file.filename = file.filename + `.${file.mimetype}`;
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${file.originalname}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: './upload',
    filename: (req, file, callback) => {
      const name = file.originalname.split('.')[0].replace(/ /g, '');
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${name}-${randomName}${fileExtName}`);
    },
  }),
});

export default multerModule;

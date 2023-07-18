import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class FileService {

  async saveImages(images: Express.Multer.File[], folder: string): Promise<string[]> {
    if (!images || images?.length < 1) throw new UnprocessableEntityException('Upload all files!')
    const urls: string[] = [];
    const uploadsDir = path.join(__dirname, '..','..', 'public', 'uploads', `${folder}`);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, {recursive: true})
    }

    images.map(image => {
      const imageName = `${uuidv4()}${path.extname(image.originalname)}`;
      const imagePath = path.join(uploadsDir, imageName);
      try {
        fs.writeFileSync(imagePath, image.buffer);
        urls.push(`uploads/${folder}/${imageName}`)
      } catch (err) {
        throw new HttpException('Error saving file to disk', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    })

    return urls;
  }

  async removeImages(imagePaths: string[]) {
    imagePaths.map(imagePath=> {
      try {
        fs.unlinkSync(path.join(__dirname,'..','..', 'public', imagePath))
      }catch (e) {
        console.log(e);
      }
    })
  }
}

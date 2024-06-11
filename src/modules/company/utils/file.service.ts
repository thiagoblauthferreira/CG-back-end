import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileEntity } from "../entities/file.entity";

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private logoRepository: Repository<FileEntity>,
  ) {}

  async save(file: Express.MulterS3.File) {
    const newFile = new FileEntity();
    newFile.fileName = file.key;
    newFile.contentLength = file.size;
    newFile.contentType = file.mimetype;
    newFile.url = file.location;
    return await this.logoRepository.save(newFile);
   
   }
 }
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false, unique: true })
  fileName: string;

  @Column({ nullable: false })
  contentLength: number;

  @Column({ nullable: false })
  contentType: string;

  @Column({ nullable: false })
  url: string;

}
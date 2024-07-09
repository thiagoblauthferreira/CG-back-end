import { Management } from "src/modules/management/entities/management.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class EmailQueue {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  date: Date;  

  @Column({ default: false })
  processed: boolean;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => Management, management => management.emailQueue)
  @JoinColumn()
  management: Management;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
}
import { User } from "src/modules/auth/entities/auth.enity";
import { Management } from "src/modules/management/entities/management.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class EmailQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;  

  @Column({ default: false })
  processed: boolean;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Management, management => management.emailQueue)
  @JoinColumn({ name: "management_id" })
  management: Management;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
  
}
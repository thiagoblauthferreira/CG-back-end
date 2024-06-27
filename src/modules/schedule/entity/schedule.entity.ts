import { Management } from "src/modules/management/entities/management.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: 'numeric', precision: 5, scale: 2 }) 
  hoursBefore: number;
  
  @Column()
  targetDate: Date;

  @Column()
  scheduleTime: Date;

  @Column()
  radius: number;

  @Column({ default: false })
  sent: boolean;

  @ManyToOne(() => Management, (management) => management.schedule)
  management: Management;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
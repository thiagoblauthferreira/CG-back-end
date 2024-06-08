import { User } from 'src/modules/auth/entities/auth.enity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Priority } from '../enums/enumPriority';
import { Status } from '../enums/enumsStatus';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';


@Entity()
export class NeedVolunteers {

  @PrimaryGeneratedColumn("uuid")
  id!: string;
  //tem que fazer a relação com o coordenador
  @ManyToOne(() => User)
  @JoinColumn({ name: "coordinatorId"})
  coordinator: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("simple-array")
  specificSkills: string[];

  @ManyToOne(() => Shelter, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: "shelterId"})
  shelter: Shelter;

  @Column({type: "enum", enum: Status, default: Status.CREATED})
  status: Status;

  @Column({type: "enum", enum: Priority, default: Priority.LOW})
  priority: Priority;

  @Column()
  workHours: number;

  @Column()
  limitDate: Date;

  @Column("simple-array", { nullable: true })
  volunteers?: string[] = []
  
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

  constructor(
    coordinator: User,
    title: string,
    description: string,
    specificSkills: string[],
    shelter: Shelter,
    status: Status,
    priority: Priority,
    workHours: number,
    limitDate: Date,
    volunteers?: string[]
  ) {
    this.coordinator = coordinator;
    this.title = title;
    this.description = description;
    this.specificSkills = specificSkills;
    this.shelter = shelter;
    this.status = status;
    this.priority = priority;
    this.workHours = workHours;
    this.limitDate = limitDate;
    this.volunteers = volunteers ?? [];
  }
  
}

import { User } from 'src/modules/auth/entities/auth.enity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Priority } from '../enums/enumPriority';
import { Status } from '../enums/enumsStatus';


@Entity()
export class NeedVolunteers {

  @PrimaryGeneratedColumn("uuid")
  id!: string;
  //tem que fazer a relação com o coordenador
  @ManyToOne(() => User)
  @JoinColumn({ name: "coordinatorId"})
  coordinator: User;

  //tem que fazer a relação com o voluntário
  @Column("simple-array", { nullable: true })
  volunteers: User[];
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column("simple-array")
  specificSkills: string[];

  //Aqui vai ficar uma entidade de endereço, um para muitos e joinColumn.
  @Column()
  shelter: string;

  @Column({type: "enum", enum: Status, default: Status.CREATED})
  status: Status;

  @Column({type: "enum", enum: Priority, default: Priority.LOW})
  priority: Priority;

  @Column()
  workHours: number;

  @Column()
  limitDate: Date;
  
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  constructor(
    coordinator: User,
    title: string,
    description: string,
    specificSkills: string[],
    shelter: string,
    status: Status,
    priority: Priority,
    workHours: number,
    limitDate: Date,
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
  }
  
}

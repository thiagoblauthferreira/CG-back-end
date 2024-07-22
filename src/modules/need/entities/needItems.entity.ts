import { User } from 'src/modules/auth/entities/auth.enity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Status } from '../enums/enumsStatus';
import { Priority } from '../enums/enumPriority';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';


@Entity()
export class NeedItem {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "coordinatorId"})
  coordinator: User;

  @Column("simple-json")
  item: {[key: string]: number};

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Shelter, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: "shelterId"})
  shelter: Shelter;

  @Column({type: "enum", enum: Status, default: Status.CREATED})
  status: Status;
  
  @Column({type: "enum", enum: Priority, default: Priority.LOW})
  priority: Priority;

  @Column()
  limitDate: Date;
  
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "donorId"})
  donor?: User;
  
  /*Assim que empresa for aceita, ela será colocada aqui como possível aceitação
  @ManyToOne(() => Company)
  @JoinColumn({ name: "companyId"})
  company?: Company;*/

  constructor(
    coordinator: User,
    title: string,
    description: string,
    shelter: Shelter,
    status: Status,
    priority: Priority,
    limitDate: Date,
    item: { [key: string]: number }
  ) {
    this.coordinator = coordinator;
    this.title = title;
    this.description = description;
    this.shelter = shelter;
    this.status = status;
    this.priority = priority;
    this.limitDate = limitDate;
    this.item = item;
    this.donor = null;
  }

 }

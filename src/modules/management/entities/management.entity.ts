import { Address } from "src/modules/auth/entities/adress.enity";
import { User } from "src/modules/auth/entities/auth.enity";
import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "./schedule.entity";
import { Shelter } from "src/modules/shelter/entities/shelter.entity";

@Entity()
export class Management {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collectionDate: Date;
  
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'coordinatorId' })
  coordinator: User;

  @ManyToOne(() => Shelter, (shelter) => shelter.id)
  @JoinColumn({ name: 'shelterId' })
  shelter: Shelter;
  
  @OneToOne(() => Address, (address) => address)
  @JoinColumn()
  collectPoint: Address

  @ManyToMany(() => NeedItem, (need) => need)
  @JoinTable()
  needItem?: NeedItem[];

  @ManyToMany(() => NeedVolunteers, (need) => need)
  @JoinTable()
  needVolunteer?: NeedVolunteers[];

  @OneToMany(() => Schedule, (schedule) => schedule.management)
  schedule: Schedule[]; 
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
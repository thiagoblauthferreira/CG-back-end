import { Address } from "src/modules/auth/entities/adress.enity";
import { User } from "src/modules/auth/entities/auth.enity";
import { NeedItem } from "src/modules/need/entities/needItems.entity";
import { NeedVolunteers } from "src/modules/need/entities/needVolunteers.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Management {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collectionData: Date;
  
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'coordinatorId' })
  coordinator: User;
  
  @OneToOne(() => Address, (address) => address)
  @JoinColumn()
  collectPoint: Address

  @ManyToMany(() => NeedItem, (need) => need)
  @JoinTable()
  needItem?: NeedItem[];

  @ManyToMany(() => NeedVolunteers, (need) => need)
  @JoinTable()
  needVolunteer?: NeedVolunteers[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

}
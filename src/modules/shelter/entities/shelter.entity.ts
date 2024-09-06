import { Address } from 'src/modules/auth/entities/adress.enity';
import { User } from 'src/modules/auth/entities/auth.enity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Shelter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Address, (address) => address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => User, (user) => user.myShelters)
  @JoinColumn()
  creator: User;

  @ManyToMany(() => User, (coordinator) => coordinator.shelters, {
    nullable: true,
  })
  @JoinTable()
  coordinators: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

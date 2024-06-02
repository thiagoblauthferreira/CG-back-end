import { Address } from 'src/modules/auth/entities/adress.enity';
import { User } from 'src/modules/auth/entities/auth.enity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DistribuitionPoints {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => Address, (address) => address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @OneToOne(() => User, (user) => user, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column()
  products: [];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

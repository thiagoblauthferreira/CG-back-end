import { Address } from 'src/modules/auth/entities/adress.enity';
import { User } from 'src/modules/auth/entities/auth.enity';
import { Products } from 'src/modules/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DistribuitionPoints {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => User, (user) => user)
  @JoinColumn()
  creator: User;

  @OneToOne(() => Address, (address) => address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Products, (products) => products.distribuitionPoint, {
    nullable: true,
  })
  @JoinColumn()
  products: Products[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProducatType } from '../enums/products.enum';
import { DistribuitionPoints } from 'src/modules/distriuition-points/entities/distribuition-point.entity';
import { User } from 'src/modules/auth/entities/auth.enity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProducatType,
    default: ProducatType.PERISHABLE,
  })
  type: ProducatType;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ nullable: true })
  weight: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user)
  creator: User;

  @ManyToOne(
    () => DistribuitionPoints,
    (distribuitionPoints) => distribuitionPoints.products,
    { nullable: true },
  )
  distribuitionPoint: DistribuitionPoints;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

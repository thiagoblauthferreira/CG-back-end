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

  @ManyToOne(
    () => DistribuitionPoints,
    (distribuitionPoints) => distribuitionPoints.products,
  )
  distribuitionPoint: DistribuitionPoints;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

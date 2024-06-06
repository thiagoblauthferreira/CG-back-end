import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Address } from '../entities/adress.enity';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';

export enum Status {
  WAITING = 'waiting',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column()
  isDonor: boolean;

  @Column()
  isCoordinator: boolean;

  @Column('simple-array')
  roles: string[];

  @Column({ nullable: true })
  hasVehicle: boolean;

  @Column({ nullable: true })
  vehicleType: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.APPROVED,
  })
  status: Status;

  @ManyToOne(() => Shelter, (shelter) => shelter.coordinators)
  shelter: Shelter;
}

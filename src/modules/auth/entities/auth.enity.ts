import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column()
  isDonor: boolean;

  @Column()
  isVolunteer: boolean;

  @Column("simple-array")
  roles: string[];

  @Column()
  personType: string;

  @Column()
  hasVehicle: boolean;

  @Column({ nullable: true })
  vehicleType: string;
}
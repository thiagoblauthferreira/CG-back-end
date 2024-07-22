import { Address } from "src/modules/auth/entities/adress.enity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  name: 'trade_name' })
  tradeName: string;

  @Column({  name: 'registered_name' })
  registeredName: string;

  @Column({name: 'email'})
  email: string;
  
  @Column({name: 'password', nullable: true})
  password: string;

  @Column({name: 'cnpj'})
  cnpj: string;

  @Column({name: 'contact'})
  contact: string;

  @Column({type: 'simple-array'})
  partner: string[];

  @OneToOne(() => Address, (address) => address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @Column({nullable: true})
  isActive: boolean;

  @OneToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  fileEntity: FileEntity;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt?: Date;

 
}
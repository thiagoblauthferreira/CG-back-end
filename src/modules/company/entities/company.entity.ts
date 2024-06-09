import { Address } from "src/modules/auth/entities/adress.enity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";
import { Partner } from "./parnter.entity";

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

  @Column({type: 'simple-array' })
  shareholder: string[];

  @OneToOne(() => Address, (address) => address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @Column({nullable: true})
  isActive: boolean;

  @OneToOne(() => FileEntity, (file) => file, {
    eager: true,
  })
  @JoinColumn()
  file?: FileEntity;

  @OneToMany(() => Partner, (partner) => partner.company, {
    eager: true
  })
  partner: Partner[];

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt?: Date;


  constructor(tradeName: string, registeredName:string, email: string, password: string, cnpj: string, contact: string, address: Address,  shareholders: string[] = []){
    this.tradeName = tradeName;
    this.registeredName = registeredName;
    this.email = email;
    this.password = password;
    this.cnpj = cnpj;
    this.address = address; 
    this.isActive = true;
    this.contact = contact;
    this.shareholder = shareholders; 
  }  
}
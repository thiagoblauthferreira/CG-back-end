import { Address } from "src/modules/auth/entities/adress.enity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FileEntity } from "./file.entity";

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  name: 'trade_name' })
  tradeName: string;

  @Column({  name: 'registered_name' })
  registeredName: string;

  @Column({name: 'email'})
  email: string;
  //somente para ajustes do banco de dados, nada mais.
  @Column({name: 'password', nullable: true})
  password: string;

  @Column({name: 'cnpj'})
  cnpj: string;

  @OneToOne(() => Address, (address) => address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;
 //somente para ajustes do banco de dados, nada mais.
  @Column({nullable: true})
  isActive: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

 @OneToOne(() => FileEntity, (file) => file, {
    eager: true,
  })
  @JoinColumn()
  file?: FileEntity;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt?: Date;


  constructor(tradeName: string, registeredName:string, email: string, password: string, cnpj: string, address: Address){
    this.tradeName = tradeName,
    this.registeredName = registeredName,
    this.email = email,
    this.password = password,
    this.cnpj = cnpj,
    this.address = address   
    this.isActive = true;
  }

  
}
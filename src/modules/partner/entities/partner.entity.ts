import { Address } from "src/modules/auth/entities/adress.enity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  name: 'trade_name' })
  tradeName: string

  @Column({  name: 'registered_name' })
  registeredName: string

  @Column({name: 'email'})
  email: string

  @Column({name: 'cnpj'})
  cnpj: string

  @OneToOne(() => Address, (address) => address, {
    eager: true,
  })
  @JoinColumn()
  address: Address;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt?: Date;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt?: Date;


  constructor(tradeName: string, registeredName:string, email: string, cnpj: string, address: Address, ){
    this.tradeName = tradeName,
    this.registeredName = registeredName,
    this.email = email,
    this.cnpj = cnpj,
    this.address = address    
  }

  
}
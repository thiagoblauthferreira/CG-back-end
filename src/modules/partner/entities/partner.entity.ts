import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column({name: 'address'})
  address: string

  @Column({name: 'registered'})
  registration: Date

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: Date;

}
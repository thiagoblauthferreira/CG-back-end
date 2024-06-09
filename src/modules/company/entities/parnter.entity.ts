import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class Partner {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  name: 'name' })
  name: string;

  @ManyToOne(() => Company, (company) => company.partner)
  company: Company;
}
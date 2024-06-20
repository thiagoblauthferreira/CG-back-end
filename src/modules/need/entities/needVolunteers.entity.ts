import { User } from 'src/modules/auth/entities/auth.enity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, DeleteDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Priority } from '../enums/enumPriority';
import { Status } from '../enums/enumsStatus';
import { Shelter } from 'src/modules/shelter/entities/shelter.entity';


@Entity()
export class NeedVolunteers {

  @PrimaryGeneratedColumn("uuid")
  id!: string;
  //tem que fazer a relação com o coordenador
  @ManyToOne(() => User)
  @JoinColumn({ name: "coordinatorId"})
  coordinator: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("simple-array")
  specificSkills: string[];

  @ManyToOne(() => Shelter, { onDelete: 'CASCADE' } )
  @JoinColumn({ name: "shelterId"})
  shelter: Shelter;

  @Column({type: "enum", enum: Status, default: Status.CREATED})
  status: Status;

  @Column({type: "enum", enum: Priority, default: Priority.LOW})
  priority: Priority;

  @Column()
  workHours: number;

  @Column()
  limitDate: Date;

  @ManyToMany(() => User, user => user.needVolunteers, {
    cascade: true,  
  })
  @JoinTable()
  volunteers: User[];
  
  
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;

 
}

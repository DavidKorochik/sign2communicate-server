import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/User';

@Entity('signing')
export class Signing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', {
    array: true,
    nullable: false,
  })
  equipment: string[];

  @Column({
    nullable: false,
    type: 'date',
  })
  signingDate: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  returningDate: string;

  @Column({
    nullable: false,
    type: 'time',
  })
  time: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.signings)
  user: User;
}

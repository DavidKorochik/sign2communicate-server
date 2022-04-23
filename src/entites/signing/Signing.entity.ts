import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/User.entity';

@Entity('signing')
export class Signing extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({
    default: 'None',
  })
  status: string;

  @ManyToOne(() => User, (user) => user.signings)
  @JoinColumn({ name: 'user' })
  user: User;
}

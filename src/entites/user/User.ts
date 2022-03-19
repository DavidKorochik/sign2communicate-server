import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Signing } from '../signing/Signing';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    length: 7,
    unique: true,
    nullable: false,
  })
  personal_number: string;

  @Column({ nullable: false })
  phone_number: string;

  @Column({ nullable: false })
  military_unit: string;

  @Column({
    default: 'Client',
    nullable: false,
  })
  role: string;

  @OneToMany(() => Signing, (signing) => signing.user)
  signings: Signing[];
}

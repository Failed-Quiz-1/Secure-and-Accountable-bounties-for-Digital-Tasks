import { Users } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  poster: Users;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({default: 0})
  approval_draft_id: number;

  @Column({ default: "pub" })
  payment_signature: string;

  @Column({ default: "pub" })
  ip_signature: string;
}


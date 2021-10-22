import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: "" })
  payment_signature: string;

  @Column({ default: "" })
  ip_signature: string;
}


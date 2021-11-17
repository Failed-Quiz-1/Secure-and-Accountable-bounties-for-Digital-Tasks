import { Job } from 'src/job/entities/job.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  poster: Job;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
  
  @Column()
  status: string;

  @Column({default: 0})
  approval_draft_id: number;

  @Column({ default: "" })
  payment_signature: string;

  @Column({ default: "" })
  ip_signature: string;

  @Column({ default: "" })
  payment_sig_message: string;

  @Column({ default: "" })
  ip_sig_message: string;

  @Column({ default: "" })
  server_signature: string;

  @Column({ default: "" })
  server_sig_message: string;
}


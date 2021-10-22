import { Task } from 'src/task/entities/task.entity';
import { Users } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('draft')
export class Draft {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  author: Users;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  task: Task;

  @Column({default:""})
  draft_signature: string;

  @Column({default:""})
  reject_signature: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdOn: Date;
}



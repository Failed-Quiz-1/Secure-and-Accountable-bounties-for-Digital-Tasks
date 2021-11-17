import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('job')
export class Job{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  poster: Users;

  @Column()
  name: string;

  @Column()
  description: string;

}


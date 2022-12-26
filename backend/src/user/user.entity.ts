import { IdentityProvider } from 'src/auth/socialProfile.model';
import { Token } from 'src/token/token.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  photo: string;

  @Column({
    type: 'enum',
    enum: IdentityProvider,
  })
  provider: IdentityProvider;

  @OneToOne(() => Token)
  @JoinColumn()
  token: Token;

  @Column()
  localId: string;
}

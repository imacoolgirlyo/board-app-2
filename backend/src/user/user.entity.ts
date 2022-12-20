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
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => Token)
  @JoinColumn()
  token: Token;

  @Column({
    type: 'enum',
    enum: IdentityProvider,
  })
  provider: IdentityProvider;

  @Column()
  localId: string;
}

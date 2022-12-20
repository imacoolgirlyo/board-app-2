import { IdentityProvider } from 'src/auth/socialProfile.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'enum',
    enum: IdentityProvider,
  })
  provider: IdentityProvider;

  @Column()
  localId: string;
}

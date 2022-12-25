import { IdentityProvider } from 'src/auth/socialProfile.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
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

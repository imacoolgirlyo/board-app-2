import { ChildEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum TokenType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  OPEN_BANKING = 'openBanking',
}
@Entity()
export abstract class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  expiry_time: Date;
}

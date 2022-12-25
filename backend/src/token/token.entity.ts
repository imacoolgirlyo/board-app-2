import {
  ChildEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

enum TokenType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  OPEN_BANKING = 'openBanking',
}
@Entity()
@TableInheritance({
  column: { type: 'simple-enum', name: 'type', enum: TokenType },
})
export abstract class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    nullable: true,
    enum: TokenType,
  })
  type!: TokenType;

  @Column()
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  expiry_time: Date;
}

@ChildEntity(TokenType.OPEN_BANKING)
export class OpenBankingToken extends Token {
  @Column({ type: 'simple-json', name: 'metadata', nullable: false })
  metadata: {
    scope: string;
    token_type: string;
  };
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logger')
export class LoggerEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @Column()
  author_uuid: string;
  @Column()
  method: string;
  @Column()
  user_uuid: string;
  @Column()
  jsonb: string;

  constructor(
    author_uuid: string,
    method: string,
    user_uuid: string,
    jsonb?: string,
    uuid?: string,
  ) {
    this.uuid = uuid;
    this.author_uuid = author_uuid;
    this.method = method;
    this.user_uuid = user_uuid;
    this.jsonb = jsonb;
  }
}

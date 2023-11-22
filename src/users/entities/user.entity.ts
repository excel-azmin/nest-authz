import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  full_name: string;
  @Column()
  email: string;
}

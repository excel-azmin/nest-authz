import { ObjectId } from 'mongodb';
import { Role } from 'src/enum/role.enum';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  password: string;

  @Column()
  roles: Role[];

  @BeforeInsert()
  updateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

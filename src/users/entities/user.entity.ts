import { ObjectId } from 'mongodb';
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

  @BeforeInsert()
  updateFullName() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}

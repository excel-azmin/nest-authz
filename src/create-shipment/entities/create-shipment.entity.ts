import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity()
export class CreateShipment extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ unique: true })
  invoice_no: string;

  @Column({ unique: true })
  lc_no: string;

  @Column()
  customer: string;

  @Column()
  item: string;

  @Column()
  qty: number;

  @ManyToOne(() => User, (user) => user.shipments)
  created_by: User;
}

import {
  Entity,
  Column,
  CreateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType, ID, InputType } from 'type-graphql';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Int)
  @Column('int', { default: 0 })
  quantity!: number;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string;
}

@InputType()
export class ProductInput {
  @Field()
  name!: string;
  @Field()
  quantity!: number;
}

@InputType()
export class ProductUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  quantity?: number;
}

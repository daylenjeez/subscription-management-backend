import { BaseEntity, Column, CreateDateColumn, Entity } from "typeorm";

@Entity('service_categories')
export class ServiceCategory extends BaseEntity {
  @Column()
  name: string;
}

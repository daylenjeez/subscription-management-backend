import { BaseEntity, Column, Entity } from "typeorm";

@Entity("service_categories")
export class ServiceCategory extends BaseEntity {
	@Column()
	name: string;

	@Column()
	logo: string;

	@Column({ nullable: true })
	description?: string;

	@Column({ default: false })
	isCustom: boolean;
}

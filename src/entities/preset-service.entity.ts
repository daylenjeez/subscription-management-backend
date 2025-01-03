import { Currency, ServiceType } from "@/types/subscription.types";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity("preset_services")
export class PresetService extends BaseEntity {
	@Column()
	name: string;

	@Column({
		type: "enum",
		enum: ServiceType,
	})
	service: ServiceType;

	// 货币
	@Column({
		type: "enum",
		enum: Currency,
		default: Currency.CNY,
	})
	currency: Currency;
}

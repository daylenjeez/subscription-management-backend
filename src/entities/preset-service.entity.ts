import { CURRENCIES, SERVICE_TYPES } from "@/constants/enum";
import type { Currency, ServiceType } from "@/types/subscription.types";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity("preset_services")
export class PresetService extends BaseEntity {
	@Column()
	name: string;

	// 服务类型
	@Column({
		type: "enum",
		enum: SERVICE_TYPES,
	})
	service: ServiceType;

	// 货币
	@Column({
		type: "enum",
		enum: CURRENCIES,
		default: CURRENCIES.CNY,
	})
	currency: Currency;
}

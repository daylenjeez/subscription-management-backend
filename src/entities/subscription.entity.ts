import { Currency, ServiceType } from "@/types/subscription.types";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PresetService } from "./preset-service.entity";
import type { Decimal } from "decimal.js";

@Entity("subscriptions")
export class Subscription extends BaseEntity {
	@Column("uuid")
	id: string;

	// 订阅的服务类型
	@Column({
		type: "enum",
		enum: ServiceType,
	})
	service: ServiceType;

	//关联预设服务
	@Column("uuid", { nullable: true })
	presetServiceId?: string;

	// 服务名称（当presetServiceId为空时使用）
	@Column()
	serviceName?: string;

	@Column({ type: "timestamptz" })
	startDate: Date;

	// 关联预设服务
	@ManyToOne(() => PresetService, { nullable: true })
	@JoinColumn({ name: "presetServiceId" })
	presetService?: PresetService;

	// 金额
	@Column("decimal", { precision: 10, scale: 2 })
	amount: Decimal;

	// 货币
	@Column({
		type: "enum",
		enum: Currency,
		default: Currency.CNY,
	})
	currency: Currency;
}

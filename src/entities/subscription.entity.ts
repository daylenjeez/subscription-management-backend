import type {
	Currency,
	ServiceType,
	SubscriptionStatus,
} from "@/types/subscription.types";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PresetService } from "./preset-service.entity";
import type { Decimal } from "decimal.js";
import {
	CURRENCIES,
	SERVICE_TYPES,
	SUBSCRIPTION_STATUSES,
} from "@/constants/enum";

@Entity("subscriptions")
export class Subscription extends BaseEntity {
	@Column("uuid")
	id: string;

	// 订阅的服务类型
	@Column({
		type: "enum",
		enum: SERVICE_TYPES,
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

	// 结束日期
	@Column({ type: "timestamptz", nullable: true })
	endDate?: Date;

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
		enum: CURRENCIES,
		default: CURRENCIES.CNY,
	})
	currency: Currency;

	// 状态
	@Column({
		type: "enum",
		enum: SUBSCRIPTION_STATUSES,
		default: SUBSCRIPTION_STATUSES.ACTIVE,
	})
	status: SubscriptionStatus;

	// 可以添加一个字段记录结束原因
	@Column({ nullable: true })
	endReason?: "EXPIRED" | "CANCELLED"; // 可选：记录是因为过期还是主动取消
}

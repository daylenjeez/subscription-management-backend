import { CURRENCIES } from "@/constants/enum";

import { type Static, Type } from "@sinclair/typebox";

// 创建订阅的请求结构
export const CreateSubscriptionSchema = Type.Object({
	presetServiceId: Type.Optional(Type.String({ format: "uuid" })),
	...Type.Union([
		// 当有 presetServiceId 时的验证
		Type.Object({
			presetServiceId: Type.String({ format: "uuid" }),
		}),
		// 当没有 presetServiceId 时的验证
		Type.Object({
			presetServiceId: Type.Null(),
			serviceName: Type.String(),
			serviceLogo: Type.String(),
		}),
	]).properties,

	// 服务名称
	serviceName: Type.String(),

	// 订阅周期
	startDate: Type.String({ format: "date-time" }),
	// endDate: Type.String({ format: "date-time" }),

	// 金额信息
	amount: Type.Number(),
	currency: Type.Enum(CURRENCIES),
});

// 生成 TypeScript 类型
export type CreateSubscriptionType = Static<typeof CreateSubscriptionSchema>;

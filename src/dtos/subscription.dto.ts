import { CURRENCIES, SERVICE_TYPES, SUBSCRIPTION_PERIODS } from "@/constants/enum";

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
	startDate: Type.String({ format: "date" }),
	// endDate: Type.String({ format: "date-time" }),

	// 金额信息
	amount: Type.Number(),
	currency: Type.Enum(CURRENCIES),
});

// 生成 TypeScript 类型
export type CreateSubscriptionType = Static<typeof CreateSubscriptionSchema>;

//编辑订阅的请求结构
export const EditSubscriptionSchema = Type.Object({
	...CreateSubscriptionSchema.properties,
	id: Type.String({ format: "uuid" }),
});

// 生成 TypeScript 类型
export type EditSubscriptionType = Static<typeof EditSubscriptionSchema>;

//返回订阅信息
export const SubscriptionResponseSchema = Type.Object({
	id: Type.String({ format: "uuid" }),
	serviceName: Type.String(),
	serviceLogo: Type.String(),
	period: Type.Enum(SUBSCRIPTION_PERIODS),
	presetServiceId: Type.Optional(Type.String({ format: "uuid" })),
	startDate: Type.String({ format: "date-time" }),
	amount: Type.Number({
		multipleOf: 0.01, // 限制小数位数为2位
		minimum: 0, // 金额不能为负
	}),
	currency: Type.Enum(CURRENCIES),
});

// 生成 TypeScript 类型
export type SubscriptionResponseDTO = Static<typeof SubscriptionResponseSchema>;

//查询订阅列表的请求结构
export const QuerySubscriptionListSchema = Type.Object({
	name: Type.Optional(Type.String()),
	type: Type.Optional(Type.Enum(SERVICE_TYPES)),
});

// 生成 Typescript类型
export type QuerySubscriptionListType = Static<typeof QuerySubscriptionListSchema>

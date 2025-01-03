import { CURRENCIES, SERVICE_TYPES } from "@/constants/enum";

import { Type } from "@sinclair/typebox";

// 创建订阅的请求结构
export const CreateSubscriptionSchema = Type.Object({
	// 服务类型
	serviceType: Type.Enum(SERVICE_TYPES),

	// 当 serviceType 为 CUSTOM 时的自定义类型
	customServiceType: Type.Optional(Type.String()),

	// 服务名称
	serviceName: Type.String(),

	// 订阅周期
	startDate: Type.String({ format: "date-time" }),
	endDate: Type.String({ format: "date-time" }),

	// 金额信息
	amount: Type.Number(),
	currency: Type.Enum(CURRENCIES),

	// 可选备注
	note: Type.Optional(Type.String()),
});

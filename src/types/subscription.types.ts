import type {
	CURRENCY,
	SERVICE_TYPE,
	SUBSCRIPTION_STATUS,
} from "@/constants/enum";

export type ServiceType = (typeof SERVICE_TYPE)[keyof typeof SERVICE_TYPE];

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];

export type SubscriptionStatus =
	(typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

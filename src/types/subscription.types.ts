import type {
	CURRENCIES,
	SERVICE_TYPES,
	SUBSCRIPTION_PERIODS,
	SUBSCRIPTION_STATUSES,
} from "@/constants/enum";

export type ServiceType = (typeof SERVICE_TYPES)[keyof typeof SERVICE_TYPES];

export type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];

export type SubscriptionPeriod =
	(typeof SUBSCRIPTION_PERIODS)[keyof typeof SUBSCRIPTION_PERIODS];

export type SubscriptionStatus =
	(typeof SUBSCRIPTION_STATUSES)[keyof typeof SUBSCRIPTION_STATUSES];

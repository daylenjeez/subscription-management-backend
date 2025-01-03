import type { Currency, SubscriptionPeriod } from "./subscription.types";

export type SubscriptionService =
	| {
			presetServiceId: string;
	  }
	| {
			serviceName?: string;
			serviceLogo?: string;
	  };

export type CreateSubscriptionParams = SubscriptionService & {
	period: SubscriptionPeriod;
	startDate: number;
	amount: number;
	currency: Currency;
	note?: string;
};

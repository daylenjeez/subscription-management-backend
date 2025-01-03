import type {
	CreateSubscriptionType,
	SubscriptionResponseDTO,
} from "@/dtos/subscription.dto";
import type { Subscription } from "@/entities/subscription.entity";
import type { Repository } from "typeorm";

const getSubscriptionResponseDTO = (
	subscription: Subscription,
): SubscriptionResponseDTO => {
	return {
		...subscription,
		amount: subscription.amount.toNumber(),
		serviceName: (subscription.presetService?.name ??
			subscription.serviceName) as string,
		serviceLogo: (subscription.presetService?.logo ??
			subscription.serviceLogo) as string,
		startDate: subscription.startDate.toISOString(),
	};
};

export class SubscriptionService {
	constructor(private subscriptionRepo: Repository<Subscription>) {}

	async create(data: CreateSubscriptionType): Promise<Subscription> {
		const subscription = this.subscriptionRepo.create(data);
		return this.subscriptionRepo.save(subscription);
	}

	async modify(
		id: string,
		data: CreateSubscriptionType,
	): Promise<Subscription> {
		const subscription = await this.findOne(id);
		return this.subscriptionRepo.save({ ...subscription, ...data });
	}

	async findAll(): Promise<SubscriptionResponseDTO[]> {
		const subscriptions = await this.subscriptionRepo.find({
			relations: ["presetService"], // 关联预设服务信息
		});

		return subscriptions.map((subscription) =>
			getSubscriptionResponseDTO(subscription),
		);
	}

	async findOne(id: string): Promise<SubscriptionResponseDTO> {
		const subscription = await this.subscriptionRepo.findOne({
			where: { id },
			relations: ["presetService"],
		});

		if (!subscription) {
			throw new Error("Subscription not found");
		}

		return getSubscriptionResponseDTO(subscription);
	}
}

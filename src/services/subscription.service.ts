import type { Subscription } from "@/entities/subscription.entity";
import type { CreateSubscriptionParams } from "@/types/request.types";
import type { Repository } from "typeorm";

export class SubscriptionService {
	constructor(private subscriptionRepo: Repository<Subscription>) {}

	async create(data: CreateSubscriptionParams): Promise<Subscription> {
		const subscription = this.subscriptionRepo.create(data);
		return this.subscriptionRepo.save(subscription);
	}

	async findAll(): Promise<Subscription[]> {
		return this.subscriptionRepo.find();
	}

	async findOne(id: string): Promise<Subscription> {
		return this.subscriptionRepo.findOneOrFail({ where: { id } });
	}
}

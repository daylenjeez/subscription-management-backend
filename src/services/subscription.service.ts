import type { CreateSubscriptionType } from "@/dtos/subscription.dto";
import type { Subscription } from "@/entities/subscription.entity";
import type { Repository } from "typeorm";

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

	async findAll(): Promise<Subscription[]> {
		return this.subscriptionRepo.find();
	}

	async findOne(id: string): Promise<Subscription> {
		return this.subscriptionRepo.findOneOrFail({ where: { id } });
	}
}

import type {
	CreateSubscriptionType,
	EditSubscriptionType,
	QuerySubscriptionListType,
	SubscriptionResponseDTO,
} from "@/dtos/subscription.dto";
import type { Subscription } from "@/entities/subscription.entity";
import { Like, type Repository } from "typeorm";

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

	/**
	 * 创建订阅
	 * @param data 创建数据
	 * @returns 创建后的订阅
	 */
	async create(data: CreateSubscriptionType): Promise<Subscription> {
		const subscription = this.subscriptionRepo.create(data);
		return this.subscriptionRepo.save(subscription);
	}

	/**
	 * 修改订阅
	 * @param id 订阅ID
	 * @param data 修改数据
	 * @returns 修改后的订阅
	 */
	async modify(id: string, data: EditSubscriptionType): Promise<Subscription> {
		const subscription = await this.findOne(id);
		return this.subscriptionRepo.save({ ...subscription, ...data });
	}

	/**
	 * 查询订阅列表
	 * @param params 查询参数
	 * @returns 订阅列表
	 */
	async findAll(params: QuerySubscriptionListType): Promise<SubscriptionResponseDTO[]> {
		const subscriptions = await this.subscriptionRepo.find({
			where: {
				serviceName: params.name ? Like(`%${params.name}%`) : undefined,
				serviceType: params.type,
			},
			relations: ["presetService"], // 关联预设服务信息
		});

		return subscriptions.map((subscription) =>
			getSubscriptionResponseDTO(subscription),
		);
	}

	/**
	 * 查询订阅
	 * @param id 订阅ID
	 * @returns 订阅
	 */
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

import { SUBSCRIPTION_PERIODS } from "@/constants/enum";
import type {
	CreateSubscriptionType,
	EditSubscriptionType,
	QuerySubscriptionListType,
	SubscriptionResponseDTO,
} from "@/dtos/subscription.dto";
import type { Subscription } from "@/entities/subscription.entity";
import { SubscriptionPeriod } from "@/types/subscription.types";
import dayjs from "dayjs";
import { Like,  type Repository } from "typeorm";


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

	
	/**
	 * 按月订阅，获取下次订阅时间
	 */
	getMonthNextBillingDate(startDate:Date){
		const dateOfMonth = dayjs(startDate).date();//每月的几号
		return dayjs().date() > dateOfMonth ?  dayjs().add(1, 'month').date(dateOfMonth).toDate() : dayjs().date(dateOfMonth).toDate()
	}

	/**
	 * 按半年订阅，获取下次订阅时间
	 */
	getHalfYearNextBillingDate(startDate:Date):Date{
		const dateOfHalfYear = dayjs(startDate).format('MM-DD');//年份的日期
		return dayjs().isAfter(dayjs(dayjs().format('YYYY') + '-' + dateOfHalfYear)) ? dayjs(dayjs().format('YYYY') + '-' + dateOfHalfYear).toDate() : dayjs(dayjs().add(6, 'month').format('YYYY') + '-' + dateOfHalfYear).toDate();
	}

	/**
	 * 按年订阅，获取下次订阅时间
	 */
	getYearNextBillingDate(startDate:Date):Date{
		const dateOfYear = dayjs(startDate).format('MM-DD');//年份的日期
		return dayjs().isAfter(dayjs(dayjs().format('YYYY') + '-' + dateOfYear)) ? dayjs(dayjs().format('YYYY') + '-' + dateOfYear).toDate() : dayjs(dayjs().add(1, 'year').format('YYYY') + '-' + dateOfYear).toDate();
	}

	/**
	 * 按季度订阅，获取下次订阅时间
	 */
	getNextQuarterDate(startDate: Date | string):Date{
    const start = dayjs(startDate);
    const now = dayjs();

    // 获取订阅日期的日期号
    const subscriptionDay = start.date(); // 31
    const subscriptionMonth = start.month(); // 0 (一月)

    // 计算当前所处的季度
    const currentQuarter = Math.floor(now.month() / 3);
    const quarterStartMonth = currentQuarter * 3;

    // 在当前季度中的相对月份
    const monthInQuarter = subscriptionMonth % 3;
    const targetMonth = quarterStartMonth + monthInQuarter;

    // 创建当前季度的订阅日期
    let targetDate = now
      .month(targetMonth)
      .date(1) // 先设置为1号，避免无效日期
      .endOf('month'); // 获取目标月份的最后一天

    // 如果目标月份的天数大于等于原始订阅日
    if (targetDate.date() >= subscriptionDay) {
      targetDate = targetDate.date(subscriptionDay);
    }
    // 否则使用月底日期

    // 如果当前日期已过本季度订阅日，则获取下个季度的日期
    if (now.isAfter(targetDate)) {
      targetDate = targetDate.add(3, 'month');
      // 同样需要处理月底情况
      if (targetDate.date() >= subscriptionDay) {
        targetDate = targetDate.date(subscriptionDay);
      } else {
        targetDate = targetDate.endOf('month');
      }
    }

    return targetDate.toDate();
  }

	/**
	 * 获取下次订阅时间
	 */
	calculateNextBillingDate(startDate: Date, period: SubscriptionPeriod): Date|undefined {
		switch (period) {
			case SUBSCRIPTION_PERIODS.MONTH:
				return this.getMonthNextBillingDate(startDate)
				case SUBSCRIPTION_PERIODS.QUARTER:
					return this.getNextQuarterDate(startDate)
				case SUBSCRIPTION_PERIODS.HALF_YEAR:
					return this.getHalfYearNextBillingDate(startDate)
				case SUBSCRIPTION_PERIODS.YEAR:
					return this.getYearNextBillingDate(startDate)
		}
	}
}


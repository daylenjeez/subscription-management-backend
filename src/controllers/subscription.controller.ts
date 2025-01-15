// src/controllers/subscription.controller.ts
import type { FastifyInstance } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { SubscriptionService } from "../services/subscription.service";
import { Subscription } from "../entities/subscription.entity";
import { CreateSubscriptionSchema, QuerySubscriptionListSchema } from "@/dtos/subscription.dto";

export default async function subscriptionRoutes(fastify: FastifyInstance) {
	const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

	// 创建订阅
	server.post("/subscriptions/create", {
		schema: {
			body: CreateSubscriptionSchema,
		},
		handler: async (request, reply) => {
			// 从 DataSource 获取 Repository
			const subscriptionRepo = fastify.db.getRepository(Subscription);
			const subscriptionService = new SubscriptionService(subscriptionRepo);

			const subscription = await subscriptionService.create(request.body);
			return reply.code(201).send(subscription);
		},
	});

	// 全部列表，支持名称搜索,类型过滤
	server.get("/subscriptions/all",{
		schema:{
			params:QuerySubscriptionListSchema
		},
		handler:async(request,reply)=>{
			const subscriptionRepo = fastify.db.getRepository(Subscription);
			const subscriptionService = new SubscriptionService(subscriptionRepo);
			const subscriptions = await subscriptionService.findAll(request.params);
			return reply.code(200).send(subscriptions);
		}
	});

	//获取即将订阅的列表
	server.get("/subscriptions/upcoming",{
		schema:{
			params:QuerySubscriptionListSchema
		},
		handler:async(request,reply)=>{
			const subscriptionRepo = fastify.db.getRepository(Subscription);
			const subscriptionService = new SubscriptionService(subscriptionRepo);
			const subscriptions = await subscriptionService.findUpcoming(request.params);
			return reply.code(200).send(subscriptions);
		}
	});
}

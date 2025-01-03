// src/controllers/subscription.controller.ts
import type { FastifyInstance } from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import { SubscriptionService } from "../services/subscription.service";
import { Subscription } from "../entities/subscription.entity";
import { CURRENCIES } from "@/constants/enum";

export default async function subscriptionRoutes(fastify: FastifyInstance) {
	const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

	server.post("/subscriptions", {
		schema: {
			body: Type.Object({
				presetServiceId: Type.Optional(Type.String({ format: "uuid" })),
				serviceName: Type.Optional(Type.String()),
				logo: Type.Optional(Type.String()),
				startDate: Type.String({ format: "date-time" }),
				amount: Type.Number(),
				currency: Type.Enum(CURRENCIES),
			}),
		},
		handler: async (request, reply) => {
			// 从 DataSource 获取 Repository
			const subscriptionRepo = fastify.db.getRepository(Subscription);
			const subscriptionService = new SubscriptionService(subscriptionRepo);

			const subscription = await subscriptionService.create(request.body);
			return reply.code(201).send(subscription);
		},
	});
}

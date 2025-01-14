import subscriptionRoutes from "@/controllers/subscription.controller";
import { FastifyInstance } from "fastify";

export default async function routes(fastify: FastifyInstance) {
  // 注册所有路由
  await fastify.register(subscriptionRoutes, { prefix: '/api' });
  
  // 可以注册更多路由
  // await fastify.register(userRoutes, { prefix: '/api' });
  // await fastify.register(authRoutes, { prefix: '/api' });
}

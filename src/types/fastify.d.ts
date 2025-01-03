import type { DataSource } from "typeorm";

// 扩展 Fastify 类型定义
declare module "fastify" {
	interface FastifyInstance {
		db: DataSource;
	}
}

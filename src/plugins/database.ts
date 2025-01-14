import { Subscription } from "../entities/subscription.entity";
import fp from "fastify-plugin";
import { DataSource } from "typeorm";

// 声明类型扩展
declare module "fastify" {
	interface FastifyInstance {
		db: DataSource;
	}
}

export default fp(async (fastify) => {
	const dataSource = new DataSource({
		type: "postgres",
		host: process.env.DB_HOST,
		port: Number.parseInt(process.env.DB_PORT || "5432"),
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		entities: [Subscription],
		synchronize: false,
	});

	await dataSource.initialize();

	// 将数据源添加到 fastify 实例
	fastify.decorate("db", dataSource);

	// 优雅关闭
	fastify.addHook("onClose", async (instance) => {
		await instance.db.destroy();
	});
});

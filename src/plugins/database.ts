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
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT || "5432"),
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		synchronize: process.env.NODE_ENV !== 'production', // 生产环境建议关闭
		logging: process.env.NODE_ENV !== 'production',
		entities: ["src/entities/**/*.ts"],
		migrations: ["src/migrations/**/*.ts"],
	});

	await dataSource.initialize();

	// 将数据源添加到 fastify 实例
	fastify.decorate("db", dataSource);

	// 优雅关闭
	fastify.addHook("onClose", async (instance) => {
		await instance.db.destroy();
	});
});

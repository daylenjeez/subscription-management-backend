// src/app.ts
import fastify from "fastify";
import database from "./plugins/database";
import subscriptionRoutes from "./controllers/subscription.controller";

async function bootstrap() {
	const app = fastify();

	// 注册插件
	await app.register(database);

	// 注册路由
	await app.register(subscriptionRoutes);

	try {
		await app.listen({ port: 3000 });
		console.log("Server started on port 3000");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

// 启动应用
bootstrap().catch(console.error);

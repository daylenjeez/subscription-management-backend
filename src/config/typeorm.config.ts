import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
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
})


// 测试连接
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

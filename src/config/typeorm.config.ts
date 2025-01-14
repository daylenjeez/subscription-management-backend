// src/config/typeorm.config.ts
import { DataSource } from 'typeorm';
import { Subscription } from '@/entities/subscription.entity';
import { databaseConfig } from './database';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [Subscription],
  synchronize: true, // 开发环境使用，生产环境请使用迁移
  logging: true
});

// 测试连接
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

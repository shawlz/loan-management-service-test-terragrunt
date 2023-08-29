import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

/**
 * to connect redis and typeorm do the following:
 * 
 * import type { RedisClientOptions } from 'redis';
  * import { redisStore } from 'cache-manager-redis-store';
 *  TypeOrmModule.forRoot(dataSourceOptions),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get('settings.redis.host'),
            port: +config.get('settings.redis.port'),
          },
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
      inject: [ConfigService],
    }),
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

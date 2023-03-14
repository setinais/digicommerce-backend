import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { EnvironmentModule } from './modules/environment/environment.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

const {
  GRAPHQL_DEBUG,
  GRAPHQL_INTROSPECTION,
  GRAPHQL_PLAYGROUND,
  DISABLE_AUTH,
} = EnvironmentModule.env;

@Module({
  imports: [
    EnvironmentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      debug: GRAPHQL_DEBUG,
      introspection: GRAPHQL_INTROSPECTION,
      persistedQueries: false,
      playground: GRAPHQL_PLAYGROUND,
      sortSchema: false,
      installSubscriptionHandlers: false,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const all: RouteInfo = {
      path: '*',
      method:
        RequestMethod.DELETE |
        RequestMethod.GET |
        RequestMethod.HEAD |
        RequestMethod.PATCH |
        RequestMethod.POST |
        RequestMethod.PUT,
    };
    consumer.apply(LoggerMiddleware).forRoutes(all);
    if (DISABLE_AUTH) {
      Logger.warn(
        'You system is running without authentication, use this only for tests',
        'Authentication',
      );
    } else {
      const root: RouteInfo = { path: '/', method: RequestMethod.GET };
      const playground: RouteInfo = {
        path: '/graphql/playground',
        method: RequestMethod.ALL,
      };
      consumer.apply(AuthMiddleware).exclude(root, playground).forRoutes(all);
    }
  }
}

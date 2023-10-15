import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { BudgetModule } from './modules/budget/budget.module';
import { CategoryModule } from './modules/category/category.module';
import { CityModule } from './modules/city/city.module';
import { EnvironmentModule } from './modules/environment/environment.module';
import { MeasureModule } from './modules/measure/measure.module';
import { ProductModule } from './modules/product/product.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './services/prisma/prisma.module';

const { GRAPHQL_DEBUG, GRAPHQL_INTROSPECTION, GRAPHQL_PLAYGROUND } =
  EnvironmentModule.env;

@Module({
  imports: [
    EnvironmentModule,
    PrismaModule.forRoot({ isGlobal: true }),
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
    AddressModule,
    CityModule,
    BudgetModule,
    MeasureModule,
    CategoryModule,
    BrandModule,
    ProductModule,
    SubCategoryModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const all: RouteInfo = {
      path: '*',
      method: RequestMethod.ALL,
    };
    consumer.apply(LoggerMiddleware).forRoutes(all);
  }
}

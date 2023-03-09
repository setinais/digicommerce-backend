import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';
import {
  EnumType,
  IJsonToGraphQLOptions,
  jsonToGraphQLQuery,
} from 'json-to-graphql-query';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { EnvironmentModule } from '../../modules/environment/environment.module';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private context = {
    unauthorized: 'AuthMiddleware:Unauthorized',
    expired: 'AuthMiddleware:Expired',
    extract: 'AuthMiddleware:Authorization',
    valid: 'AuthMiddleware:AccessValidation',
  };

  query(token: string, kind: string = 'LOGIN', func: string = '') {
    const { API_NAME } = EnvironmentModule.env;
    return {
      mutation: {
        valid: {
          __args: {
            token: token,
            kind: new EnumType(kind),
            request: {
              api: API_NAME,
              function: func,
              additional_informations: {},
            },
          },
          user: {
            name: true,
            email: true,
            cpf: true,
          },
        },
      },
    };
  }

  extract(req: any) {
    const token =
      req.headers?.authorization?.split(' ').at(1) ||
      req.headers?.authorization;
    if (!token) {
      const error = new UnauthorizedException('You must provide a token');
      Logger.debug(
        { error, token: `${token}`, headers: `${req?.rawHeaders}` },
        this.context.extract,
      );
      Logger.error(error);
      throw error;
    }
    return token;
  }

  expired(token: string) {
    const payload = jwt_decode<JwtPayload>(token);
    const tz = -3 * (60 * 60 * 1000);
    const now = Date.now() + tz;
    const exp = Number(payload?.exp) * 1000;
    if (now >= exp) {
      const error = new UnauthorizedException('Your token is expired');
      Logger.debug(
        {
          error,
          token: `${token}`,
          payload,
          now: new Date(now).toISOString(),
          created: payload?.iat
            ? new Date(payload?.iat * 1000).toISOString()
            : '',
          expires: payload?.exp
            ? new Date(payload?.exp * 1000).toISOString()
            : 'never',
        },
        this.context.expired,
      );
      Logger.error(error);
      throw error;
    }
    return false;
  }

  async valid(token: string) {
    const { API_DIGICOMMERCE_HOST, API_DIGICOMMERCE_SECRET } =
      EnvironmentModule.env;
    try {
      const options: IJsonToGraphQLOptions = {
        pretty: true,
        ignoreFields: [],
        includeFalsyKeys: false,
      };
      const graphqlQuery = jsonToGraphQLQuery(this.query(token), options);
      const graphQLClient = new GraphQLClient(API_DIGICOMMERCE_HOST, {
        headers: { Authorization: `Bearer ${API_DIGICOMMERCE_SECRET}` },
      });
      const response = await graphQLClient.request(graphqlQuery);
      Logger.debug({ token, valid: response?.valid }, this.context.valid);
    } catch (exception) {
      const error = new UnauthorizedException('You must provide a valid token');
      Logger.debug({ error, token: `${token}`, exception }, this.context.valid);
      Logger.error(error);
      throw error;
    }
  }

  async use(req: any, res: any, next: () => void) {
    const token = this.extract(req);
    const expired = this.expired(token);
    if (!expired) {
      await this.valid(token);
    }
    next();
  }
}

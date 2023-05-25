import { Logger, Module, OnModuleInit, ValidationError } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
  EnvironmentAdditional,
  environmentAdditional,
} from './environment.additional';
import {
  EnvironmentMandatory,
  environmentMandatory,
} from './environment.mandatory';
import {
  EnvironmentOptional,
  environmentOptional,
} from './environment.optional';

@Module({})
export class EnvironmentModule implements OnModuleInit {
  public static env = {
    // ...environmentAdditional,
    ...environmentMandatory,
    ...environmentOptional,
  };

  static validate<T extends Object>(
    cls: ClassConstructor<T>,
    config: Record<string, unknown>,
  ) {
    const validatedConfig: Object = plainToClass(cls, config, {
      enableImplicitConversion: true,
    });
    const errors: ValidationError[] = validateSync(validatedConfig, {
      skipMissingProperties: false,
      stopAtFirstError: true,
    });
    for (const error of errors) {
      console.log(error);
      Logger.debug({ ...error }, 'Environment');
      Logger.error(
        `property: ${error.property} is '${error.value}' ${JSON.stringify(
          error.constraints,
        )}`,
        'Environment',
      );
    }
    if (errors.length > 0) {
      process.exit(1);
    }
    return validatedConfig;
  }

  onModuleInit() {
    // Called once the host module's dependencies have been resolved.
    EnvironmentModule.validate(EnvironmentMandatory, environmentMandatory);
    // EnvironmentModule.validate(EnvironmentAdditional, environmentAdditional);
    EnvironmentModule.validate(EnvironmentOptional, environmentOptional);
    Object.entries(EnvironmentModule.env).forEach(([key, value]) =>
      Logger.debug(`[${typeof value}] ${key}: "${value}"`, 'Environment'),
    );
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExceptionsHandler } from '../../core/exceptions/exceptions-handler';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth/gql-auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Public } from 'src/core/decorators/public.decorator';

enum SUBSCRIPTION_EVENTS {
  userCreated = 'userCreated',
  userRemoved = 'userRemoved',
  userUpdated = 'userUpdated',
}

@UseGuards(GqlAuthGuard, RoleGuard)
@Resolver(() => User)
export class UsersResolver extends ExceptionsHandler {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Public()
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      createUserInput.profiles = { connect: { id: createUserInput.profileId } };
      delete createUserInput.profileId;
      const user = await this.usersService.create(createUserInput);
      if (user) {
        // await this.pubSub.publish(SUBSCRIPTION_EVENTS.userCreated, { userCreated: user });
      }
      return user;
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Query(() => [User], { name: 'users', nullable: true })
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Mutation(() => User, { name: 'updateUser', nullable: true })
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      const user = await this.usersService.update(updateUserInput);
      if (user) {
        // await this.pubSub.publish(SUBSCRIPTION_EVENTS.userUpdated, { userUpdated: user });
      }
      return user;
    } catch (error) {
      return this.handleError(error);
    }
  }

  @Mutation(() => User, { name: 'removeUser', nullable: true })
  async removeUser(@Args('id', { type: () => String }) id: string) {
    try {
      const user = await this.usersService.remove(id);
      if (user) {
        // await this.pubSub.publish(SUBSCRIPTION_EVENTS.userRemoved, { userRemoved: user });
      }
      return user;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

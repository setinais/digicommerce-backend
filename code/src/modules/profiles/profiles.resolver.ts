import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ExceptionsHandler } from '../../core/exceptions/exceptions-handler';
import { GqlAuthGuard } from 'src/guards/gql-auth/gql-auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard, RoleGuard)
@Resolver(() => Profile)
export class ProfilesResolver extends ExceptionsHandler {
  constructor(private readonly profilesService: ProfilesService) {
    super();
  }

  @Mutation(() => Profile)
  createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput): Promise<Profile> {
    return this.profilesService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.profilesService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput): Promise<Profile> {
    return this.profilesService.update(updateProfileInput.id, updateProfileInput);
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number): Promise<Profile> {
    return this.profilesService.remove(id);
  }

  @Mutation(() => Profile)
  upsertProfile(@Args('updateProfileInput') updateProfileInput: UpdateProfileInput): Promise<Profile> {
    return this.profilesService.upsert(updateProfileInput);
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ROLE } from '@prisma/client';
import { CurrentToken } from 'src/core/decorators/CurrentTokenGql.decorator';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create-address.input';
import { FindAllAddressInput } from './dto/find-all-address.input';
import { FindOneAddressInput } from './dto/find-one-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';
import { FindAllAddressOutput } from './dto/find-all-address.output';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => Address)
  createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return this.addressService.create(createAddressInput);
  }

  @Query(() => FindAllAddressOutput, { name: 'addresses' })
  findAll(
    @Args('findAllAddressInput', { nullable: true })
    findAllAddressInput: FindAllAddressInput,
    @CurrentToken() user: any,
  ) {
    return this.addressService.findAll(findAllAddressInput);
  }

  @Query(() => Address, { name: 'address' })
  findOne(
    @Args('findOneAddressInput') findOneAddressInput: FindOneAddressInput,
  ) {
    return this.addressService.findOne(findOneAddressInput.id);
  }

  @Mutation(() => Address)
  updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
    @CurrentToken() user: any,
  ) {
    const id = ROLE.ADMIN === user.role ? updateAddressInput.id : user.id;
    return this.addressService.update({ ...updateAddressInput, id: id });
  }

  @Mutation(() => Address)
  removeAddress(
    @Args('deleteAddressInput') findOneAddressInput: FindOneAddressInput,
    @CurrentToken() user: any,
  ) {
    const id = ROLE.ADMIN === user.role ? findOneAddressInput.id : user.id;
    return this.addressService.remove(id);
  }
}

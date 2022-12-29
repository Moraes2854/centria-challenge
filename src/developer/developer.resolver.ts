import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { DeveloperService } from './developer.service';
import { Developer } from './entities/developer.entity';
import { CreateDeveloperInput, UpdateDeveloperInput } from './dto';
import { ValidEspecialidadesArgs, ValidProyectosArgs } from '../common/dto';

@Resolver(() => Developer)
export class DeveloperResolver {
  
  constructor(
    private readonly developerService: DeveloperService,
  ) {}

  @Mutation(() => Developer, { name: 'createDeveloper' })
  createDeveloper(
    @Args('createDeveloperInput') createDeveloperInput: CreateDeveloperInput
  ): Developer {
    return this.developerService.create(createDeveloperInput);
  }

  @Query(() => [ Developer ], { name: 'findAllDevelopers' })
  findAll(
    @Args() validEspecialidadesArgs:ValidEspecialidadesArgs,
    @Args() validProyectosArgs:ValidProyectosArgs,
  ): Developer[] {
    return this.developerService.findAll(validEspecialidadesArgs, validProyectosArgs);
  }

  @Query(() => Developer, { name: 'findOneDeveloper' })
  findOne(
    @Args('id', { type: () => String }) id: string
  ): Developer {
    return this.developerService.findOne(id);
  }

  @Mutation(() => Developer, { name: 'updateDeveloper' })
  updateDeveloper(
    @Args('updateDeveloperInput') updateDeveloperInput: UpdateDeveloperInput
  ): Developer {
    return this.developerService.update(updateDeveloperInput);
  }

  @Mutation(() => Developer, { name: 'removeDeveloper' })
  removeDeveloper(
    @Args('id', { type: () => String }) id: string
  ): boolean {
    return this.developerService.remove(id);
  }
}

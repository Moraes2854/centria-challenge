import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { EspecialidadService } from './especialidad.service';
import { Especialidad } from './entities/especialidad.entity';
import { CreateEspecialidadInput, UpdateEspecialidadInput } from './dto';

@Resolver(() => Especialidad)
export class EspecialidadResolver {
  constructor(private readonly especialidadService: EspecialidadService) {}

  @Mutation(() => Especialidad, { name:'createEspecialidad' })
  createEspecialidad(
    @Args('createEspecialidadInput') createEspecialidadInput: CreateEspecialidadInput
  ): Especialidad {
    return this.especialidadService.create(createEspecialidadInput);
  }

  @Query(() => [Especialidad], { name:'findAllEspecialidades' })
  findAll(): Especialidad[] {
    return this.especialidadService.findAll();
  }

  @Query(() => Especialidad, { name:'findOneEspecialidad' })
  findOne(
    @Args('id', { type: () => ID }) id: string
  ): Especialidad {
    return this.especialidadService.findOne(id);
  }

  @Mutation(() => Especialidad, { name:'updateEspecialidad' })
  updateEspecialidad(
    @Args('updateEspecialidadInput') updateEspecialidadInput: UpdateEspecialidadInput
  ): Especialidad {
    return this.especialidadService.update(updateEspecialidadInput);
  }

  @Mutation(() => Especialidad, { name:'removeEspecialidad' })
  removeEspecialidad(
    @Args('id', { type: () => ID }) id: string
  ): boolean {
    return this.especialidadService.remove(id);
  }
}

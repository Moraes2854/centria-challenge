import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoInput, UpdateProyectoInput } from './dto';
import { AddDevToProyectInput } from './dto/inputs/add-dev-to-proyect.input';
import { ValidEspecialidadesArgs, ValidStatusArgs } from '../common/dto';
import { ResolverService } from '../resolver/resolver.service';

@Resolver(() => Proyecto)
export class ProyectoResolver {

  constructor(
    private readonly proyectoService: ProyectoService,
    private readonly resolverService: ResolverService,
  ) {}

  @Mutation( () => Boolean, { name:'addDevToProyecto' })
  addDevToProyecto(
    @Args('addDevToProyectInput') {devID, proyectID}: AddDevToProyectInput
  ): boolean {
    return this.resolverService.assignDevAndProyect({devID, proyectID});
  }

  @Mutation(() => Proyecto, { name: 'createProyecto' })
  createProyecto(
    @Args('createProyectoInput') createProyectoInput: CreateProyectoInput
  ): Proyecto {
    return this.proyectoService.create(createProyectoInput);
  }

  @Query(() => [Proyecto], { name: 'findAllProyectos' })
  findAll(
    @Args() validEspecialidadesArgs:ValidEspecialidadesArgs,
    @Args() validStatusArgs:ValidStatusArgs,
  ): Proyecto[] {
    return this.proyectoService.findAll(validEspecialidadesArgs, validStatusArgs);
  }

  @Query(() => Proyecto, { name: 'findOneProyecto' })
  findOne(
    @Args('id', { type: () => String }) id: string
  ): Proyecto {
    return this.proyectoService.findOne(id);
  }

  @Mutation(() => Proyecto, { name: 'updateProyecto' })
  updateProyecto(
    @Args('updateProyectoInput') updateProyectoInput: UpdateProyectoInput
  ): Proyecto {
    return this.proyectoService.update(updateProyectoInput);
  }

  @Mutation(() => Proyecto, { name: 'removeProyecto' })
  removeProyecto(
    @Args('id', { type: () => String }) id: string
  ): boolean {
    return this.proyectoService.remove(id);
  }
}

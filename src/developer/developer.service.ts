import { Inject, Injectable, NotFoundException, forwardRef, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateDeveloperInput, UpdateDeveloperInput } from './dto';
import { Developer } from './entities/developer.entity';
import { EspecialidadService } from '../especialidad/especialidad.service';
import { Especialidad } from '../especialidad/entities/especialidad.entity';
import { ValidEspecialidadesArgs, ValidProyectosArgs } from 'src/common/dto';
import { AddProyectToDevInput } from './dto/inputs/add-proyect-to-dev.input';
import { ProyectoService } from '../proyecto/proyecto.service';
import { ResolverService } from '../resolver/resolver.service';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { findCommonElementInArrays } from '../common/helpers/findCommonElementsInArray';

@Injectable()
export class DeveloperService {
  public developers: Developer[] = [];

  constructor ( 

    private readonly especialidadService:EspecialidadService,
  ){}

  addProyectoToDev( devID:string, proyecto:Proyecto ): Developer{
    
    const dev = this.findOne(devID);
    
    if ( dev.proyectos.find( (proyect) => proyect.id === proyecto.id ) ) throw new BadRequestException(`The proyect with ID: '${ proyecto.id }' alredy has the developer named ${dev.nombre}`);

    if ( !findCommonElementInArrays(dev.especialidades, proyecto.especialidadesValidas) ) throw new BadRequestException(`The developer ${dev.nombre} does not have the especialities needed to work in this proyect`);

    const updatedDev:Developer = {
      ...dev,
      proyectos:[...dev.proyectos, proyecto]
    }

    this.developers = this.developers.map( (dev) => (dev.id === devID) ? updatedDev : dev);

    return updatedDev;

  }

  create({especialidades:especialidadesIds, ...createDeveloperInput}: CreateDeveloperInput): Developer {

    const especialidades: Especialidad[] = [];

    if (especialidadesIds) especialidades.push( ...this.especialidadService.findSeveralByID(especialidadesIds) );

    const newDeveloper:Developer = {
      ...createDeveloperInput,
      id:uuidv4(),
      proyectos:[],
      especialidades,
    }

    this.developers.push(newDeveloper);
    
    return newDeveloper;
  }


  findAll(  { especialidades:validEspecialidades }: ValidEspecialidadesArgs, { proyectos:validProyectos }: ValidProyectosArgs ): Developer[] {

    let developers:Developer[] = this.developers;
    
    if ( validEspecialidades.length > 0 ) {
      developers = developers.filter( (dev) => 
        dev.especialidades.some( especialidad => validEspecialidades.includes( especialidad.id ) )
      )
    }

    if ( validProyectos.length > 0) {
      developers = developers.filter( (dev) => 
        dev.proyectos.some( proyecto => validProyectos.includes( proyecto.id ) )
      )
    }

    return developers;
  }

  findOne(id: string): Developer {
    const developer = this.developers.find((dev)=>dev.id === id);

    if ( !developer ) throw new NotFoundException(`Developer with id ${id} was not found`);

    return developer;
  }

  update({ id, especialidades:especialidadesIds, ...updateDeveloperInput }: UpdateDeveloperInput): Developer {

    const currentDeveloper = this.findOne(id);
    const especialidades: Especialidad[] = [];
    if (especialidadesIds) especialidades.push( ...this.especialidadService.findSeveralByID(especialidadesIds) );
    else especialidades.push( ...currentDeveloper.especialidades );

    const developerUpdated:Developer = {

      ...this.findOne(id),
      ...updateDeveloperInput,
      especialidades,
      
    };
    
    this.developers = this.developers.map( (dev) => (dev.id === id) ? developerUpdated : dev );

    return developerUpdated;

  }

  remove(id: string): boolean {

    this.findOne(id);

    this.developers = this.developers.filter( (dev) => dev.id !== id );

    return true;
    
  }
}

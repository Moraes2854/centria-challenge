import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateProyectoInput, UpdateProyectoInput } from './dto';
import { Proyecto } from './entities/proyecto.entity';
import { Especialidad } from '../especialidad/entities/especialidad.entity';
import { EspecialidadService } from '../especialidad/especialidad.service';
import { AddDevToProyectInput } from './dto/inputs/add-dev-to-proyect.input';
import { findCommonElementInArrays } from '../common/helpers/findCommonElementsInArray';
import { ValidEspecialidadesArgs, ValidStatusArgs } from '../common/dto';
import { DeveloperService } from '../developer/developer.service';
import { Developer } from '../developer/entities/developer.entity';


@Injectable()
export class ProyectoService {
  public proyectos:Proyecto[] = [];
  
  constructor ( 
    private readonly especialidadService:EspecialidadService,
  ) {}

  addDevToProyecto( proyectID:string, dev:Developer ): Proyecto{

    const proyecto = this.findOne(proyectID);

    if ( proyecto.devs.find((dev) => dev.id === dev.id) ) throw new BadRequestException(`The developer '${dev.nombre}' is alredy working in this proyect`)

    if ( !findCommonElementInArrays(dev.especialidades, proyecto.especialidadesValidas) ) throw new BadRequestException(`The developer ${dev.nombre} does not have the especialities needed to work in this proyect`);

    const proyectoUpdated:Proyecto = {
      ...proyecto,
      devs:[...proyecto.devs, dev],
    };
    
    this.proyectos = this.proyectos.map( (pro) => (pro.id === proyectID) ? proyectoUpdated : pro );
    
    return proyectoUpdated;
  }

  create({especialidadesValidas:especialidadesIds, ...createProyectoInput}: CreateProyectoInput): Proyecto {

    const especialidadesValidas: Especialidad[] = [];

    if (especialidadesIds) especialidadesValidas.push( ...this.especialidadService.findSeveralByID(especialidadesIds) );

    const newProyecto:Proyecto = {
      ...createProyectoInput,
      id:uuidv4(),
      devs:[],
      especialidadesValidas
    };

    this.proyectos.push(newProyecto);

    return newProyecto;
  }

  
  findAll( { especialidades }:ValidEspecialidadesArgs, { status }:ValidStatusArgs ): Proyecto[] {

    const proyectos = this.proyectos.filter( (proyecto ) => proyecto.status === status);

    if (especialidades.length > 0 ) {
      return proyectos.filter( ( proyecto ) => 
        proyecto.especialidadesValidas.some(especialidad => especialidades.includes( especialidad.id ) ) 
      )
    }

    return proyectos;
  }
  
  findOne(id: string): Proyecto {
    
    const proyecto = this.proyectos.find((pro)=>pro.id === id);
    
    if ( !proyecto ) throw new NotFoundException(`Proyecto with id ${id} was not found`);
    
    return proyecto;
    
  }
  
  findSeveralByID( ids:string[] ): Proyecto[] {

    const proyectos:Proyecto[] = [];

    ids.forEach(( id ) => {
      
      const proyecto = this.findOne(id);
      proyectos.push(proyecto);

    })

    return proyectos;
  }



  update({id, especialidadesValidas:especialidadesIds, ...updateProyectoInput}: UpdateProyectoInput): Proyecto {
    
    const currentProyecto = this.findOne(id);
    const especialidadesValidas: Especialidad[] = [];
    if (especialidadesIds) especialidadesValidas.push( ...this.especialidadService.findSeveralByID(especialidadesIds) );
    else especialidadesValidas.push( ...currentProyecto.especialidadesValidas );
    
    const proyectoUpdated:Proyecto = {
      ...currentProyecto,
      ...updateProyectoInput,
    };
    
    this.proyectos = this.proyectos.map( (pro) => (pro.id === id) ? proyectoUpdated : pro );

    return proyectoUpdated;

  }

  remove(id: string): boolean {
    this.findOne(id);

    this.proyectos = this.proyectos.filter( (pro) => pro.id !== id );

    return true;
  }
}

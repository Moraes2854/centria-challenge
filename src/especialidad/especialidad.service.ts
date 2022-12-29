import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateEspecialidadInput, UpdateEspecialidadInput } from './dto';
import { Especialidad } from './entities/especialidad.entity';

@Injectable()
export class EspecialidadService {

  public especialidades: Especialidad[] = [
    {
      id:"2f018c36-ef4d-4db4-becb-ad42cfce7dc5",
      nombre: "Frontend"
    },
    {
      id: "101b3009-7b2a-463e-b319-141d0936754f",
      nombre: "Backend"
    }
  ];


  create( createEspecialidadInput: CreateEspecialidadInput ): Especialidad {

    if ( this.especialidades.find( ( especialidad ) => especialidad.nombre.toUpperCase() === createEspecialidadInput.nombre.toUpperCase()) ) throw new BadRequestException(`Alredy exists an especialidad with nombre ${ createEspecialidadInput.nombre} `);

    const newEspecialidad:Especialidad = {
      ...createEspecialidadInput,
      id:uuidv4(),
    }

    this.especialidades.push( newEspecialidad );

    return newEspecialidad;

  }

  findAll(): Especialidad[] {

    return this.especialidades;

  }

  findOne(id: string): Especialidad {

    const especialidad = this.especialidades.find( (esp) => esp.id === id );

    if ( !especialidad ) throw new NotFoundException(`Especialidad  with id ${id} was not found`);

    return especialidad;

  }

  findSeveralByID( ids:string[] ): Especialidad[] {

    const especialidades:Especialidad[] = [];

    ids.forEach( (id) => {

      const especialidad = this.findOne(id);
      especialidades.push(especialidad);

    })

    return especialidades;
    
  }

  update({id, ...updateEspecialidadInput}: UpdateEspecialidadInput): Especialidad {
    
    const especialidadUpdated: Especialidad = {
      ...this.findOne(id),
      ...updateEspecialidadInput
    }

    this.especialidades = this.especialidades.map( (especialidad) => (especialidad.id === id) ? especialidadUpdated : especialidad );

    return especialidadUpdated;

  }

  remove(id: string): boolean {
    this.findOne(id);

    this.especialidades = this.especialidades.filter( (especialidad) => especialidad.id !== id );

    return true;

  }
}

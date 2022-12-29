import { Injectable } from '@nestjs/common';
import { AddDevToProyectInput } from 'src/proyecto/dto/inputs/add-dev-to-proyect.input';
import { DeveloperService } from '../developer/developer.service';
import { ProyectoService } from '../proyecto/proyecto.service';
import { Developer } from '../developer/entities/developer.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';


@Injectable()
export class ResolverService {

  constructor(
    private readonly developerService:DeveloperService,
    private readonly proyectoService:ProyectoService,
  ){}

  assignDevAndProyect({ devID, proyectID }: AddDevToProyectInput): boolean {

    const developer = this.developerService.findOne(devID);
    const proyecto = this.proyectoService.findOne(proyectID);

    this.developerService.addProyectoToDev(devID, proyecto);
    this.proyectoService.addDevToProyecto(proyectID, developer);

    return true;
  }


}

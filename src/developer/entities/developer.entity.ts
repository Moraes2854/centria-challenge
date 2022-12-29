import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Status } from '../../common/enums/status.enum';
import { Especialidad } from '../../especialidad/entities/especialidad.entity';

@ObjectType()
export class Developer {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  nombre: string;

  @Field( () => String )
  email: string;

  @Field( () => Status )
  status: Status;

  @Field( () => [ Especialidad ])
  especialidades:Especialidad[];

  @Field( () => [ Proyecto ], { nullable:true })
  proyectos:Proyecto[]
  
}

import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Developer } from '../../developer/entities/developer.entity';
import { Status } from '../../common/enums/status.enum';
import { Especialidad } from '../../especialidad/entities/especialidad.entity';

@ObjectType()
export class Proyecto {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  nombre: string;

  @Field( () => String )
  descripcion: string;

  @Field( () => Status )
  status: Status;

  @Field( () => [ Especialidad ])
  especialidadesValidas:Especialidad[];

  @Field( () => [ Developer ], { nullable:true })
  devs:Developer[];

}

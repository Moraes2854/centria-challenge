import { InputType, Field } from '@nestjs/graphql';
import { Status } from '../../../common/enums/status.enum';
import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProyectoInput {

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @Field( () => Status )
  @IsIn([Status.DISABLED, Status.ENABLED])
  status: Status;

  @Field( () => [ String ])
  @IsArray()
  @IsString({ each:true })
  especialidadesValidas:string[];


}

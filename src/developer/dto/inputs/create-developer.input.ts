import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, IsString, IsUUID, IsOptional, IsIn } from 'class-validator';
import { Status } from '../../../common/enums/status.enum';

@InputType()
export class CreateDeveloperInput {

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field( () => [ String ] )
  @IsArray()
  @IsString({ each:true })
  especialidades:string[];

  @Field( () => Status )
  @IsNotEmpty()
  @IsString()
  @IsIn([Status.DISABLED, Status.ENABLED])
  status: Status;




  // @Field( () => [ ID ], { nullable:true })
  // @IsArray()
  // @IsUUID('4', { each:true } )
  // @IsOptional()
  // proyectos?:string[];

}

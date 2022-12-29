import { CreateProyectoInput } from './create-proyecto.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsArray, IsOptional } from 'class-validator';

@InputType()
export class UpdateProyectoInput extends PartialType(CreateProyectoInput) {

  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
  
}

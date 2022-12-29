import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEspecialidadInput {

  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  nombre: string;
  
}

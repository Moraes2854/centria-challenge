import { CreateEspecialidadInput } from './create-especialidad.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateEspecialidadInput extends PartialType(CreateEspecialidadInput) {
  
  @Field(() => ID)
  id: string;

}

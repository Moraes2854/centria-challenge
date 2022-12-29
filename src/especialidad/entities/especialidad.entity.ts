import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Especialidad {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  nombre: string;
  
}

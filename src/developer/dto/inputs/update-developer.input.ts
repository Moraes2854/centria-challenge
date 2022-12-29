import { CreateDeveloperInput } from './create-developer.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsArray, IsOptional } from 'class-validator';

@InputType()
export class UpdateDeveloperInput extends PartialType(CreateDeveloperInput) {

  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;


}

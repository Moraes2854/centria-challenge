import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class AddProyectToDevInput {
    @Field( () => ID )
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    devID:string;

    @Field( () => ID )
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    proyectID:string;
}

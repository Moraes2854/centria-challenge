import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';


@ArgsType()
export class ValidEspecialidadesArgs{

    @Field( () => [ String ], { nullable:true })
    @IsArray()
    especialidades:string[] = [];

}
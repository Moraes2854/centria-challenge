import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';


@ArgsType()
export class ValidProyectosArgs{

    @Field( () => [ String ], { nullable:true })
    @IsArray()
    proyectos:string[] = [];

}
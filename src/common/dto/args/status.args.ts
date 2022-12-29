import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsOptional } from 'class-validator';
import { Status } from '../../enums/status.enum';


@ArgsType()
export class ValidStatusArgs {

    @Field( () => Status, { nullable:true } )
    @IsIn([Status.DISABLED, Status.ENABLED])
    @IsOptional()
    status?: Status = Status.ENABLED;
    

}
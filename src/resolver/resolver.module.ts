import { Module } from '@nestjs/common';
import { ResolverService } from './resolver.service';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { DeveloperModule } from '../developer/developer.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
  exports: [ResolverService],
  imports: [ 
    forwardRef( () => DeveloperModule ), 
    forwardRef( () => ProyectoModule ), 
  ],
  providers: [ResolverService],
})
export class ResolverModule {}

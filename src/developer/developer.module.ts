import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperResolver } from './developer.resolver';
import { EspecialidadModule } from '../especialidad/especialidad.module';
import { ProyectoModule } from '../proyecto/proyecto.module';
import { forwardRef } from '@nestjs/common/utils';
import { ResolverModule } from '../resolver/resolver.module';

@Module({
  providers: [ DeveloperResolver, DeveloperService ],
  imports: [ 
    EspecialidadModule, 
    forwardRef( () => ResolverModule ),    
  ],
  exports: [ DeveloperService ],
})
export class DeveloperModule {}

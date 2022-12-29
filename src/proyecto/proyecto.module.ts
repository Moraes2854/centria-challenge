import { Module, forwardRef } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoResolver } from './proyecto.resolver';
import { EspecialidadModule } from '../especialidad/especialidad.module';
import { ResolverModule } from '../resolver/resolver.module';

@Module({
  exports: [ ProyectoService ],
  imports:[ 
    EspecialidadModule, 
    forwardRef( () => ResolverModule ),    
  ],
  providers: [ProyectoResolver, ProyectoService],

})
export class ProyectoModule {}

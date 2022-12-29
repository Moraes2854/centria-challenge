import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadResolver } from './especialidad.resolver';

@Module({
  providers: [EspecialidadResolver, EspecialidadService],
  exports:[ EspecialidadService ],
})
export class EspecialidadModule {}

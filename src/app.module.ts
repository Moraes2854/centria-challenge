import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { ProyectoModule } from './proyecto/proyecto.module';
import { DeveloperModule } from './developer/developer.module';
import { CommonModule } from './common/common.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { ResolverModule } from './resolver/resolver.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver:ApolloDriver,
      useFactory:async()=>({
        playground: false,
        autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
        plugins:[
          ApolloServerPluginLandingPageLocalDefault
        ],
      })
    }),
    CommonModule,
    DeveloperModule,
    EspecialidadModule,
    ProyectoModule,
    ResolverModule,
  ],
})
export class AppModule {}

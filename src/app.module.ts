import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  // dessa forma permitimos que o .env seja o lindo e deixamos as variaveis disponiveis em toda aplicação.
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    DatabaseModule,
    UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

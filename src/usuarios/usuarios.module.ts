import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
// importamos o banco de dados
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}

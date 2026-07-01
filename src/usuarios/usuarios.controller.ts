import { Controller, Body, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService:UsuariosService){}
// requisição do tipo post para a rota usuarios
    @Post()
    criar(@Body() CreateUsuarioDto:CreateUsuarioDto){
        return this.usuariosService.criar(CreateUsuarioDto)
    }
}

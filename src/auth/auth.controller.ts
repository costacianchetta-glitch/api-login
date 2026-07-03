import { Controller, Body, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
 
    //Endpoint post para auth/login
    //Recebe o email e senha para tentar autenticar o usuario
    @Post('login')
    login(@Body() loginDto:LoginDto){
        return this.authService.login(loginDto);
    }
 
    @Get('publica')
    rotaPublic(){
        return{
            mensagem: 'Esta é uma rota publica'
        }
    }
    @UseGuards(AuthGuard)
    @Get('privada')
    rotaPrivada(@Req() req){
        return{
            mensagem:'Token Valido, Bem-vindo(a) á area protegida!',
            usuario: req.user
        }
    }
}
 
 
 
 
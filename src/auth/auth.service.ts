import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { Usuario } from './interface/usuario.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly databaseService:DatabaseService, private jwtService:JwtService){}

    async login(loginDto:LoginDto){
        const {email, senha} = loginDto;
        const resultado = await this.databaseService.query(
            `SELECT id, nome, email, senha FROM usuario WHERE email = ?`,
            [email]
        );
        // convertendo o resultado para uma lista de usuarios
        const usuarios = resultado as Usuario[];

        // pegamos o primeiro usuario encontrado
        const usuario = usuarios[0];

        // se o email n existir no banco, retornamos erros
        if (!usuario) {
            throw new UnauthorizedException('Email ou senha invalidos');
        }

        const senhaValida = await compare(senha, usuario.senha);
        
        if(!senhaValida){
            throw new UnauthorizedException('Email ou senha invalidos')
        }
// playload é a informação que ira dentro do tokem
        const payload = {
            id: usuario.id,
            email: usuario.email
        }
        // geramos o token jwt com as informações do playload
        const token = this.jwtService.sign(payload);

        return {
            mensagem: 'login realizado com sucesso',
            access_token: token, // token usado para as proximas requisições
            usuarios: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        };
    }

}

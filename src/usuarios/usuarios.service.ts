import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { DatabaseService } from 'src/database/database.service';
import { hash } from 'bcrypt';
@Injectable()
export class UsuariosService {
    // injetamos a fatabaseservice para poder acessar o bando de dados

    constructor(private readonly databaseService:DatabaseService){}

    async criar(createUsuarioDto:CreateUsuarioDto){
        // extraimos os dadps enviados no corpo da requisição
        const {nome, email, senha} = createUsuarioDto;

        const senhaHash = await hash(senha, 10);
// comandos sql para incerir o usuario do banco
        const sql = `INSERT INTO usuario (nome, email, senha) VALUES (?,?,?) `;
// neste primeiro momento, salvaremos a senha como o usuario digitar
        await this.databaseService.query(sql, [nome, email, senhaHash]);
        
        return {
            mesagem:'Usuario cadastrado com sucesso!'
        };
    }
}

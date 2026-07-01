import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// gerenciador de conexoes com banco de dados
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    // conjunto de conexoes com banco de dados
    private pool : Pool;
// o configservice faz leitura do arquivo .env
    constructor(private readonly configService:ConfigService){
// o createpool cria conexao reutilizavel com o mysql
    this.pool=createPool({
        host: this.configService.get<string>('DB_HOST'),
        port: Number(this.configService.get<string>('DB_HOST')),
        user: this.configService.get<string>('DB_USER'),
        password:  this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_NAME')
    });
}
// metodo generico para executar comanados em sql
// query é como se fosse uma busca

async query(sql: string, params?: any[]){
    const [resultado] = await this.pool.execute(sql,params);
    return resultado;
}

}

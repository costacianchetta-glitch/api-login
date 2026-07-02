import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule,
  JwtModule.register({
    secret: 'chave-secreta-da-aula',
    signOptions: {
      expiresIn: '1h'
    }
  })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

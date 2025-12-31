import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplatesModule } from './templates/templates.module';
import { CardsModule } from './cards/cards.module';
import { GuestsModule } from './guests/guests.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventcard'),
    AuthModule,
    UsersModule,
    TemplatesModule,
    CardsModule,
    GuestsModule,
    CloudinaryModule,
  ],
})
export class AppModule {}


import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CollectionsModule } from './collections/collections.module.js';
import { PrismaModule } from './database/prisma.module.js'

@Module({
  imports: [CollectionsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

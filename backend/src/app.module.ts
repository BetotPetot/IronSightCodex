import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CollectionsModule } from './collections/collections.module.js';

@Module({
  imports: [CollectionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

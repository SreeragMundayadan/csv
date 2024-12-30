import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { CsvModule } from './modules/csv/csv.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigurationModule,
    CsvModule,
  ],
})
export class AppModule {}

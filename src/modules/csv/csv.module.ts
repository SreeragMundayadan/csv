import { Module } from '@nestjs/common';
import { CsvController } from '../../controllers/csv.controller';
import { CsvService } from './csv.service';
import { AgeDistributionService } from '../../services/age-distribution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [CsvController],
    providers: [CsvService, AgeDistributionService],
})
export class CsvModule { }

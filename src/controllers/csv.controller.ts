import { Body, Controller, Post } from '@nestjs/common';
import { CsvService } from '../modules/csv/csv.service';
import { AgeDistributionService } from '../services/age-distribution.service';
import { Logger } from '@nestjs/common';
import { UploadCsvDto } from 'src/common/dto/csv-upload.dto';

@Controller('csv')
export class CsvController {
    private readonly logger = new Logger(CsvController.name);  // Logger instance

    constructor(
        private readonly csvService: CsvService,
        private readonly ageDistributionService: AgeDistributionService
    ) { }

    @Post('upload')
    async uploadCsv(@Body() uploadCsvDto: UploadCsvDto): Promise<{ message: string }> {
        this.logger.log('CSV upload endpoint called');

        try {
            await this.csvService.uploadCSVData(uploadCsvDto.path);
            await this.ageDistributionService.calculateAgeDistribution();

            this.logger.log('CSV upload and age distribution calculation completed');
            return { message: 'CSV data uploaded and age distribution calculated.' }
        } catch (error) {
            this.logger.error('Error occurred during CSV upload or age distribution calculation', error.stack);
            throw error;
        }
    }
}

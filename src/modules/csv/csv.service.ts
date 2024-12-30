import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { parseCSV, processRow } from './csv.parser';

@Injectable()
export class CsvService {
    private readonly logger = new Logger(CsvService.name);  // Logger instance

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async uploadCSVData(filePath: string): Promise<void> {
        this.logger.log(`Started uploading CSV from: ${filePath}`);

        try {
            const rows = await parseCSV(filePath);
            this.logger.log(`CSV file parsed successfully with ${rows.length} rows`);

            const processedRows = rows.map(processRow);

            for (const row of processedRows) {
                await this.userRepository.save(row);
            }

            this.logger.log(`CSV data successfully uploaded to the database`);
        } catch (error) {
            this.logger.error('Error during CSV file upload or parsing', error.stack);
        }
    }
}

import { IsString } from 'class-validator';

export class UploadCsvDto {
    @IsString()
    path: string;
}

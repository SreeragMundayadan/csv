import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import { User } from 'src/entities/user.entity';

export async function parseCSV(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const rows: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => rows.push(data))
            .on('end', () => resolve(rows))
            .on('error', (err) => reject(err));
    });
}

export function processRow(row: any): User {
    const processed: any = {
        name: `${row['name.firstName']} ${row['name.lastName']}`,
        age: parseInt(row.age)
    };

    const address = {
        line1: row['address.line1'],
        line2: row['address.line2'],
        city: row['address.city'],
        state: row['address.state']
    };

    processed.address = address;

    // Move additional properties to additional_info
    const additional_info: Record<string, any> = {};
    Object.keys(row).forEach((key) => {
        if (!key.startsWith('name') && !key.startsWith('address')) {
            additional_info[key] = row[key];
        }
    });
    processed.additional_info = additional_info;

    return processed;
}

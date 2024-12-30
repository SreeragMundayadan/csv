import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AgeDistributionService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async calculateAgeDistribution() {
        const users = await this.userRepository.find();
        const ageGroups = { '<20': 0, '20-40': 0, '40-60': 0, '>60': 0 };

        users.forEach(({ age }) => {
            if (age < 20) ageGroups['<20']++;
            else if (age <= 40) ageGroups['20-40']++;
            else if (age <= 60) ageGroups['40-60']++;
            else ageGroups['>60']++;
        });

        const total = users.length;
        for (const group in ageGroups) {
            ageGroups[group] = ((ageGroups[group] / total) * 100).toFixed(2);
        }

        console.table('Age-Group % Distribution:');
        for (const [group, percentage] of Object.entries(ageGroups)) {
            console.table(`${group}: ${percentage}%`);
        }
    }
}

import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [RentalController],
  providers: [RentalService, AuthGuard],
})
export class RentalModule {}

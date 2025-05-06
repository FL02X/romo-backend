import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [SaleController],
  providers: [SaleService, PrismaService, AuthGuard],
})
export class SaleModule {}

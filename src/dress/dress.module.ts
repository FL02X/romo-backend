import { Module } from '@nestjs/common';
import { DressService } from './dress.service';
import { DressController } from './dress.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [AuthModule],
  controllers: [DressController],
  providers: [DressService],
})
export class DressModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('sales') // '/sales'
@UseGuards(AuthGuard, RolesGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  /**
   * Crea una nueva venta.
   * @param createSaleDto - Objeto que contiene los datos de la venta (validado por CreateSaleDto).
   * @returns El registro de la venta creada.
   */
  @Post() // '/sales'
  @Roles('ADMIN', 'STAFF')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  /**
   * Recupera todas las ventas.
   * @returns Una lista de todas las ventas.
   */
  @Get() // '/sales'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.saleService.findAll();
  }

  /**
   * Recupera una venta específica por su ID.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta si existe.
   */
  @Get(':id') // '/sales/:id'
  @Roles('ADMIN', 'STAFF')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id); //
  }

  /**
   * Actualiza una venta específica.
   * @param id - El identificador único de la venta.
   * @param updateSaleDto - Objeto que contiene los datos a actualizar (validado por UpdateSaleDto).
   * @returns El registro de la venta actualizada.
   */
  @Patch(':id') // '/sales/:id'
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(id, updateSaleDto);
  }

  /**
   * Elimina una venta específica.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta eliminada.
   */
  @Delete(':id') // '/sales/:id'
  @Roles('ADMIN', 'STAFF')
  remove(@Param('id') id: string) {
    return this.saleService.remove(id);
  }
}

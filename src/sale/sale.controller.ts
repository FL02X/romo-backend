// Importa los decoradores y servicios necesarios
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'; // Decoradores para definir rutas y manejar solicitudes HTTP
import { SaleService } from './sale.service'; // Servicio que contiene la lógica de negocio para las ventas
import { CreateSaleDto } from './dto/create-sale.dto'; // DTO para validar los datos al crear una venta
import { UpdateSaleDto } from './dto/update-sale.dto'; // DTO para validar los datos al actualizar una venta
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

// Define el controlador para manejar las rutas relacionadas con las ventas
@Controller('sales') // Todas las rutas de este controlador estarán bajo el prefijo '/sales'
@UseGuards(AuthGuard, RolesGuard)
export class SaleController {
  // Inyecta el servicio SaleService para manejar la lógica de negocio
  constructor(private readonly saleService: SaleService) {}

  /**
   * Crea una nueva venta.
   * @param createSaleDto - Objeto que contiene los datos de la venta (validado por CreateSaleDto).
   * @returns El registro de la venta creada.
   */
  @Post() // Define que este método maneja solicitudes POST en '/sales'
  @Roles('ADMIN', 'STAFF')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto); // Llama al servicio para crear una venta
  }

  /**
   * Recupera todas las ventas.
   * @returns Una lista de todas las ventas.
   */
  @Get() // Define que este método maneja solicitudes GET en '/sales'
  @Roles('ADMIN', 'STAFF')
  findAll() {
    return this.saleService.findAll(); // Llama al servicio para obtener todas las ventas
  }

  /**
   * Recupera una venta específica por su ID.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta si existe.
   */
  @Get(':id') // Define que este método maneja solicitudes GET en '/sales/:id'
  @Roles('ADMIN', 'STAFF')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id); // Llama al servicio para buscar una venta por su ID
  }

  /**
   * Actualiza una venta específica.
   * @param id - El identificador único de la venta.
   * @param updateSaleDto - Objeto que contiene los datos a actualizar (validado por UpdateSaleDto).
   * @returns El registro de la venta actualizada.
   */
  @Patch(':id') // Define que este método maneja solicitudes PATCH en '/sales/:id'
  @Roles('ADMIN', 'STAFF')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.saleService.update(id, updateSaleDto); // Llama al servicio para actualizar una venta
  }

  /**
   * Elimina una venta específica.
   * @param id - El identificador único de la venta.
   * @returns El registro de la venta eliminada.
   */
  @Delete(':id') // Define que este método maneja solicitudes DELETE en '/sales/:id'
  @Roles('ADMIN', 'STAFF')
  remove(@Param('id') id: string) {
    return this.saleService.remove(id); // Llama al servicio para eliminar una venta
  }
}

import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CausaBeneficaDto } from './dto';

@Controller('ong')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() causaBeneficaDto: CausaBeneficaDto) {
    return this.appService.crearCausaBenefica(causaBeneficaDto);
  }

  @Post('/donate')
  donate(@Body() causaBeneficaDto: CausaBeneficaDto) {
    return this.appService.donar(causaBeneficaDto);
  }

  @Post('/distribute')
  distributeFunds() {
    return this.appService.distribuirFondos();
  }

  @Get('/causas')
  causas() {
    return this.appService.obtenerCausasBeneficas();
  }

  @Get('/balance')
  getBalance() {
    return this.appService.obtenerBalance();
  }

  @Get('/causas-donadas')
  getCausasDonadas(@Query('wallet') wallet) {
    return this.appService.obtenerCausasDonadas(wallet);
  }
}

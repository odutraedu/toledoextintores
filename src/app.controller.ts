import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { get } from 'http';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get('consulta-cep/:cep')
  async consultarCep(@Param('cep') cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await lastValueFrom(this.httpService.get(url));
    const data = response.data;
    return {
      cep: data.cep,
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
      siafi: data.siafi,
      
    };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import {
  Headers,
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { ExtintorService } from './extintor.service';
import { CreateExtintorDto } from './dto/create-extintor.dto';
import { UpdateExtintorDto } from './dto/update-extintor.dto';
import { AuthService } from 'src/auth/auth.service';
import { query } from 'express';

@Controller('extintor')
export class ExtintorController {
  constructor(
    private readonly extintorService: ExtintorService,
    // private readonly authService: AuthService,
  ) {}

  @Post()
  create(
    @Headers('x-api-token') token: string,
    @Body() createExtintorDto: CreateExtintorDto,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    return this.extintorService.create(createExtintorDto);
  }

  @Get()
  findAll(
    //@Headers('x-api-token') token: string,
    @Query('nome') nome?: string,
    @Query('classe') classe?: string,
    @Query('preco') preco?: string,
    @Query('validade') validade?: string,
    @Query('peso') peso?: string,
  ) {
    //if (!token) throw new UnauthorizedException('Token não enviado!');

    //this.authService.validadeToken(token);

    return this.extintorService.findAll(
      nome,
      classe,
      preco ? parseInt(preco) : undefined,
      peso ? parseInt(peso) : undefined,
      validade,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('x-api-token') token: string) {
    if (!token) throw new UnauthorizedException('Token não enviado!');

    return this.extintorService.findOne(+id);
  }

  @Put(':id')
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Update an existing extintor.
   *
   * @param token - The API token sent in the headers.
   * @param id - The ID of the extintor to update.
   * @param updateExtintorDto - The DTO that contains the updated information.
   * @returns The updated extintor.
   */
  /*******  e7f8a0bc-de15-429d-b29b-1b4c560c158b  *******/
  update(
    @Headers('x-api-token') token: string,
    @Param('id') id: string,
    @Body() updateExtintorDto: UpdateExtintorDto,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    return this.extintorService.update(+id, updateExtintorDto);
  }

  @Delete(':id')
  remove(@Headers('x-api-token') token: string, @Param('id') id: string) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    return this.extintorService.remove(+id);
  }

  @Patch(':id/entrada')
  entradaEstoque(
    @Headers('x-api-token') token: string,
    @Param('id') id: string,
    @Body('quantidade') quantidade: number,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    return this.extintorService.entradaEstoque(+id, quantidade);
  }

  @Patch(':id/saida')
  saidaEstoque(
    @Headers('x-api-token') token: string,
    @Param('id') id: string,
    @Body('quantidade') quantidade: number,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    return this.extintorService.saidaEstoque(+id, quantidade);
  }
}

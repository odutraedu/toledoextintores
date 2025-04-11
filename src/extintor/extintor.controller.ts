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
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createExtintorDto: CreateExtintorDto) {
    return this.extintorService.create(createExtintorDto);
  }

  @Get()
  findAll(
    @Headers('x-api-token') token: string,
    @Query('nome') nome?: string,
    @Query('classe') classe?: string,
    @Query('preco') preco?: string,
    @Query('validade') validade?: string,
    @Query('peso') peso?: string,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');

    this.authService.validadeToken(token);

    return this.extintorService.findAll(
      nome,
      classe,
      preco ? parseInt(preco): undefined,
      peso ? parseInt(peso): undefined,
      validade,
      
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extintorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExtintorDto: UpdateExtintorDto,
  ) {
    return this.extintorService.update(+id, updateExtintorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extintorService.remove(+id);
  }
}

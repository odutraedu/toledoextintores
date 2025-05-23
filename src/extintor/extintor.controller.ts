import {
  Headers,
  Controller,
  Get,
  Post,
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

@Controller('extintor')
export class ExtintorController {
  constructor(
    private readonly extintorService: ExtintorService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(
    @Headers('x-api-token') token: string,
    @Body() createExtintorDto: CreateExtintorDto,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    this.authService.validadeToken(token);
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
    @Query('id') id?: string,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    this.authService.validadeToken(token);

    return this.extintorService.findAll(
      nome,
      classe,
      preco ? parseFloat(preco) : undefined,
      peso ? parseFloat(peso) : undefined,
      validade,
    id ? parseInt(id) : undefined,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Headers('x-api-token') token: string,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    this.authService.validadeToken(token);
    return this.extintorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Headers('x-api-token') token: string,
    @Param('id') id: string,
    @Body() updateExtintorDto: UpdateExtintorDto,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    this.authService.validadeToken(token);
    return this.extintorService.update(+id, updateExtintorDto);
  }

  @Delete(':id')
  remove(
    @Headers('x-api-token') token: string,
    @Param('id') id: string,
  ) {
    if (!token) throw new UnauthorizedException('Token não enviado!');
    this.authService.validadeToken(token);
    return this.extintorService.remove(+id);
  }
}
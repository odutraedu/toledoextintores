import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExtintorService } from './extintor.service';
import { CreateExtintorDto } from './dto/create-extintor.dto';
import { UpdateExtintorDto } from './dto/update-extintor.dto';

@Controller('extintor')
export class ExtintorController {
  constructor(private readonly extintorService: ExtintorService) {}

  @Post()
  create(@Body() createExtintorDto: CreateExtintorDto) {
    return this.extintorService.create(createExtintorDto);
  }

  @Get()
  findAll() {
    return this.extintorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extintorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExtintorDto: UpdateExtintorDto) {
    return this.extintorService.update(+id, updateExtintorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extintorService.remove(+id);
  }
}

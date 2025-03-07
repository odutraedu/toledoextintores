import { Injectable } from '@nestjs/common';
import { CreateExtintorDto } from './dto/create-extintor.dto';
import { UpdateExtintorDto } from './dto/update-extintor.dto';
import { Extintor } from './entities/extintor.entity';

@Injectable()
export class ExtintorService {

private extintores: Extintor[] = [{
   
  id: 1,
  nome: 'Co2',
  classe: 'BC',
  preco: 300,
  validade: new Date('2025-12-12'),
  peso: 60
},
{
   
  id: 2,
  nome: 'p4',
  classe: 'ABC',
  preco: 120,
  validade: new Date('2025-12-12') ,
  peso: 40
}
];



  create(createExtintorDto: CreateExtintorDto) {
    return 'This action adds a new extintor';
  }

  findAll() {
    return this.extintores;
  }

  findOne(id: number): Extintor | undefined {
    return this.extintores.find(Extintor => Extintor.id === id);
  }

  update(id: number, updateExtintorDto: UpdateExtintorDto) {
    return `This action updates a #${id} extintor`;
  }

  remove(id: number) {
    return `This action removes a #${id} extintor`;
  }
}

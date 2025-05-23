import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExtintorDto } from './dto/create-extintor.dto';
import { UpdateExtintorDto } from './dto/update-extintor.dto';
import { Extintor } from './entities/extintor.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExtintorService {
  constructor(private prisma: PrismaService) {}

  async create(createExtintorDto: CreateExtintorDto): Promise<Extintor> {
    try {
      const extintor = await this.prisma.extintor.create({
        data: createExtintorDto,
      });
      return this.maptoEntity(extintor);
    } catch (error) {
      throw new BadRequestException('Dados inválidos para criação do extintor.');
    }
  }

async findAll(
  nome?: string,
  classe?: string,
  preco?: number,
  peso?: number,
  validade?: string,
  id?: number,
): Promise<Extintor[]> {
  try {
    const where: any = {
      ...(nome && { nome: { contains: nome, mode: 'insensitive' } }),
      ...(classe && { classe: { contains: classe, mode: 'insensitive' } }),
      ...(preco !== undefined && { preco }),
      ...(peso !== undefined && { peso }),
      ...(validade && { validade: new Date(validade) }),
    };

    // Se o filtro for por id, valide e retorne erro se não existir
    if (typeof id === 'number' && !isNaN(id) && id > 0) {
      where.id = id;
      const extintor = await this.prisma.extintor.findMany({
        where,
        orderBy: { id: 'asc' },
      });
      if (extintor.length === 0) {
        throw new NotFoundException('Extintor não encontrado.');
      }
      return extintor.map((extintor) => this.maptoEntity(extintor));
    }

    // Se id não for informado, retorne erro
    if (id !== undefined) {
      throw new NotFoundException('Extintor não encontrado.');
    }

    // Caso nenhum id seja passado, retorna todos normalmente
    const extintor = await this.prisma.extintor.findMany({
      where,
      orderBy: { id: 'asc' },
    });
    return extintor.map((extintor) => this.maptoEntity(extintor));
  } catch (error) {
    throw new BadRequestException('Erro ao buscar extintores.');
  }
}
  private maptoEntity(extintor: any): Extintor {
    return {
      id: extintor.id,
      nome: extintor.nome,
      classe: extintor.classe,
      preco: extintor.preco,
      validade: extintor.validade,
      peso: extintor.peso,
    };
  }

  async findOne(id: number): Promise<Extintor | null> {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('ID inválido.');
    }
    const extintor = await this.prisma.extintor.findUnique({ where: { id } });
    if (!extintor) {
      throw new NotFoundException('Extintor não encontrado.');
    }
    return this.maptoEntity(extintor);
  }

  async update(
    id: number,
    updateExtintorDto: UpdateExtintorDto,
  ): Promise<Extintor> {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('ID inválido.');
    }
    try {
      const extintor = await this.prisma.extintor.update({
        where: { id },
        data: updateExtintorDto,
      });
      return this.maptoEntity(extintor);
    } catch (error) {
      throw new NotFoundException('Extintor não encontrado para atualização.');
    }
  }

  async remove(id: number): Promise<Extintor> {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('ID inválido.');
    }
    try {
      const extintor = await this.prisma.extintor.delete({
        where: { id },
      });
      return this.maptoEntity(extintor);
    } catch (error) {
      throw new NotFoundException('Extintor não encontrado para remoção.');
    }
  }
}
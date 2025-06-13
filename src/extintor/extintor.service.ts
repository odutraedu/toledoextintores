import { Injectable } from '@nestjs/common';
import { CreateExtintorDto } from './dto/create-extintor.dto';
import { UpdateExtintorDto } from './dto/update-extintor.dto';
import { Extintor } from './entities/extintor.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExtintorService {
  constructor(private prisma: PrismaService) {}

  async create(createExtintorDto: CreateExtintorDto): Promise<Extintor> {
    const extintor = await this.prisma.extintor.create({
      data: createExtintorDto,
    });
    return this.maptoEntity(extintor);
  }

  async findAll( 
    nome?: string,
    classe?: string,
    preco?: number,
    peso?: number,
    validade?: string,

    ): Promise<Extintor[]> {
    const extintor = await this.prisma.extintor.findMany({

      where: {
        ...(nome && { nome: { contains: nome, mode: 'insensitive' } }),
        ...(classe && { classe: { contains: classe, mode: 'insensitive' } }),
        ...(preco && { preco }),
        ...(peso && { peso }),
        ...(validade && { validade: new Date(validade) }), // Certifique-se de que validade seja uma string de data válida
        
      },

      orderBy: { id: 'asc' },
    });
    return extintor.map((extintor) => this.maptoEntity(extintor));
  }

  private maptoEntity(extintor: any): Extintor {
    return {
      id: extintor.id,
      nome: extintor.nome,
      classe: extintor.classe,
      preco: extintor.preco,
      validade: extintor.validade, // Certifique-se de que validade seja uma string de data válida
      peso: extintor.peso,
    };
  }

  async findOne(id: number): Promise<Extintor | null> {
    const extintor = await this.prisma.extintor.findUnique({ where: { id } });
    return extintor ? this.maptoEntity(extintor) : null;
  }

 async update(
  id: number,
  updateExtintorDto: UpdateExtintorDto,
): Promise<Extintor> {
  // Remove explicitamente o campo id, caso venha do front-end, usando cast para any
  const { id: _, ...dataWithoutId } = updateExtintorDto as any;

  // Converte validade para Date se necessário
  if (dataWithoutId.validade) {
    dataWithoutId.validade = new Date(dataWithoutId.validade);
  }

  const extintor = await this.prisma.extintor.update({
    where: { id },
    data: dataWithoutId,
  });
  return this.maptoEntity(extintor);
}

  async remove(id: number): Promise<Extintor> {
    const extintor = await this.prisma.extintor.delete({
      where: { id },
    });
    return this.maptoEntity(extintor);
  }

  async entradaEstoque(id: number, quantidade: number): Promise<Extintor> {
    const extintor = await this.prisma.extintor.update({
      where: { id },
      data: { quantidade: { increment: quantidade } },
    });
    return this.maptoEntity(extintor);
  }

  async saidaEstoque(id: number, quantidade: number): Promise<Extintor> {
    const extintor = await this.prisma.extintor.update({
      where: { id },
      data: { quantidade: { decrement: quantidade } },
    });
    return this.maptoEntity(extintor);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.maptoEntity(user));
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    return this.maptoEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return this.maptoEntity(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.prisma.user.delete({ where: { id } });
    return this.maptoEntity(user);
  }

  async create(createuserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: createuserDto,
      });
      return this.maptoEntity(user);
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Já existe um usuário com este e-mail.');
      }
      throw error;
    }
  }

  async authenticate(email: string, senha: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user || user.senha !== senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.maptoEntity(user);
  }

  private maptoEntity(user: any): User {
    return {
      id: user.id,
      email: user.email,
      senha: user.senha,
      nome: user.nome,
    };
  }
}

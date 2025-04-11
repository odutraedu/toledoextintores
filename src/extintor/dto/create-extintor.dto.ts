import { IsDate, IsInt, IsString, isDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExtintorDto {
  @IsString()
  nome: string;
  classe: string;
  @IsInt()
  preco: number;
  peso: number;

  @Type(() => Date)
  @IsDate()
  validade: Date;
}

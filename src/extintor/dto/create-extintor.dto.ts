import { IsDate, IsInt, IsNumber, IsPositive, IsString, isDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExtintorDto {
  @IsString()
  nome: string;

  @IsString()
  classe: string;

  @IsNumber()
  @IsPositive()
  preco: number;

  @IsNumber()
  @IsPositive()
  peso: number;

  @Type(() => Date)
  @IsDate()
  validade: Date;
}

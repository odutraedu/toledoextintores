import { IsDate, IsInt, IsNumber, IsPositive, IsString, isDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExtintorDto {
  @IsString( {message: 'Nome deve ser valido'})
  nome: string;

  @IsString( {message: 'Classe deve ser valido'})
  classe: string;

  @IsNumber({}, {message: ' deve ser um número'})
  @IsPositive(   {message: 'Preco deve ser um número positivo'})
  preco: number;

  @IsNumber( {}, {message: 'Peso deve ser um número'})
  @IsPositive( {message: 'Peso deve ser um número positivo'})
  peso: number;

  @Type(() => Date)
  @IsDate({message: 'Data de validade deve ser uma data válida'})
  validade: Date;
}

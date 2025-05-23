import { IsDate, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, isDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExtintorDto {
  @IsString( {message: 'Nome deve ser valido'})
  @IsNotEmpty({message: 'Nome não pode ser vazio'})
  nome: string;

  @IsString( {message: 'Classe deve ser valido'})
   @IsNotEmpty({message: 'Nome não pode ser vazio'})
  classe: string;

  @IsNumber({}, {message: ' deve ser um número'})
   @IsNotEmpty({message: 'Nome não pode ser vazio'})
  @IsPositive(   {message: 'Preco deve ser um número positivo'})
  preco: number;

  @IsNumber( {}, {message: 'Peso deve ser um número'})
   @IsNotEmpty({message: 'Nome não pode ser vazio'})
  @IsPositive( {message: 'Peso deve ser um número positivo'})
  peso: number;

  @Type(() => Date)
  @IsDate({message: 'Data de validade deve ser uma data válida'})
   @IsNotEmpty({message: 'Nome não pode ser vazio'})
  validade: Date;

  
}

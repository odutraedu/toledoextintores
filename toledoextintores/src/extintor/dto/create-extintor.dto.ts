import { IsDate, IsInt, IsString, isDate} from "class-validator";



export class CreateExtintorDto {
  @IsString()
  nome: string;
  classe: string;
  @IsInt()
  preco: number;
  peso: number;
  
  @IsDate()
  validade: Date;
  
}

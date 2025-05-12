import { IsNotEmpty, IsString, IsOptional, IsHexColor } from "class-validator";

export class CreateTagDto {

    @IsNotEmpty({ message: 'La etiqueta debe tener un nombre' })
    @IsString({ message:'El nombre debe ser texto' })
    name:string;

    @IsOptional()
    @IsHexColor({ message: 'debe ser un codigo hexadecimal valido' })
    color: string;


}

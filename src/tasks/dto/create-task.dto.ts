import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
    @IsNotEmpty({ message: 'el titulo es requerido' })
    @IsString({ message: 'el titulo debe ser un string' })
    title: string;

    @IsOptional()
    @IsString({ message: 'La descripcion debe ser texto'})
    description: string;

    @IsOptional()
    @IsBoolean({ message: 'El completado debe ser un valor boolean' })
    completed: boolean;

    @IsOptional()
    @IsDate({ message: 'La fecha de vencimiento debe ser una fecha valida' })
    @Type(() => Date)
    dueDate?: Date;

}
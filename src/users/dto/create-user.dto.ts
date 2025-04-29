import { IsEmail, IsNotEmpty, MinLength, IsString} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Nombre es requerido'})
    @IsString({message: 'Nombre debe ser un texto00'})
    name: string;

    @IsNotEmpty({message: 'Email es requerido'})
    @IsEmail({}, {message: 'Email debe ser válido'})
    email: string;

    @IsNotEmpty({message: 'Contraseña es requerida'})
    @MinLength(6, {message: 'Contraseña debe tener al menos 6 caracteres'})
    password: string;

}


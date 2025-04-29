import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Verifica que las variables de entorno se cargan correctamente
  console.log('JWT_SECRET está definido:', !!process.env.JWT_SECRET);
  console.log('MONGODB_URI está definido:', !!process.env.MONGODB_URI);
  
  const app = await NestFactory.create(AppModule);
  
  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Transforma tipos automáticamente
    }),
  );
  
  // Habilitar CORS para desarrollo
  app.enableCors();
  
  // Esta línea es crucial - sin ella, el servidor no arranca
  await app.listen(process.env.PORT || 3000);
  
  console.log(`Aplicación iniciada en: http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
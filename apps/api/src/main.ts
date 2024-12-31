import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("WeColok API")
    .setDescription("API documentation for WeColok")
    .setVersion("1.0")
    .addBearerAuth() // Optionnel : Ajoute un support pour les tokens JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.enableCors({
    origin: ["http://147.79.100.203", "http://localhost:4200"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

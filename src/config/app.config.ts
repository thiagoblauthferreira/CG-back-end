import { INestApplication, ValidationPipe } from "@nestjs/common";

export function appConfig(app: INestApplication): void {
    app.useGlobalPipes(new ValidationPipe());
}
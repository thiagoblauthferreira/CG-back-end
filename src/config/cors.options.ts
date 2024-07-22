import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    origin: ["https://coletivogloma.com.br", "http://coletivogloma.com.br"]
}
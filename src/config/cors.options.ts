import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    /**
     * adicione a URL de produção aqui quando tudo estiver pronto
     * para bloquear acesso de qualquer lugar exceto da URL de
     * produção, por enquanto qualquer acesso permitido
     */
    origin: "*"
}
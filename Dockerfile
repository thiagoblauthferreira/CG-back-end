# Use a base image Node.js
FROM node:hydrogen-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de definição de pacote (package.json e package-lock.json se existirem)
COPY package*.json ./

# Instalação das dependências
RUN npm install

# Copia todos os arquivos do diretório atual para /app no container
COPY . .

# Copia a pasta de certificados para o diretório /app/certificados no container
COPY certificados ./certificados

# Copia o arquivo filebeat.yml para o diretório /app no container
COPY filebeat.yml /app/filebeat.yml

# Constrói o projeto NestJS
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor em produção
CMD ["npm", "run", "start:prod"]

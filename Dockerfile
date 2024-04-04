# Use uma imagem oficial do Node.js como imagem base
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Aqui você deverá adicionar o arquivo .env manualmente se tiver um
COPY . .

# Instala as dependências do projeto
RUN yarn install

# Expõe a porta que o aplicativo usará
EXPOSE 3000

# Define o comando para executar a aplicação
CMD ["yarn", "start"]


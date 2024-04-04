# Computação UFCG

## Clone o repositório
```
git clone https://github.com/cilasmarques/ufcg-comp-app-web
cd ufcg-comp-app-web
```
* Configure um arquivo .env 

## Execução com docker

### Instale o docker
```
curl -fSsL https://get.docker.com | bash 
```

### Faça build da imagem
```
docker build -t ufcg-comp-app-web .
```

### Execute o container
```
docker run -p 3000:3000 -d ufcg-comp-app-web
```

## Execução sem docker

### Instale o NodeJS, o NPM e o Yarn
```
curl -s https://deb.nodesource.com/setup_16.x | sudo bash
```

```
sudo apt-get install -y nodejs
```

```
sudo apt-get update 
```

```
sudo npm install -g npm@9.5.0
```

```
sudo npm install -g yarn
```

### Instale as dependencias
```
yarn install
```

### Execução do aplicativo pelo 
```
yarn start
```
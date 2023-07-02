# Base de Dados de Acordãos

## Introdução
No âmbito do projeto da unidade curricular de Engenharia Web, foi desenvolvida uma plataforma de auxílio ao Ministério da Justiça Português, com vista a unanimizar a consulta dos conjuntos de acórdãos que cada tribunal, com autonomia própria, disponibiliza periodicamente.
Cada tribunal tem a sua própria base de dados, resultando num conjunto distinto de 14 ficheiros JSON. Incialmente, foi efetuado o tratamento destes dados e criada uma base de dados unificada. Em seguida, foram desenvolvidos os serviços de autenticação e API, com recurso ao Express.js, e interface, utilizando React. 

## Manipulação dos Dados
Para ser possível realizar o carregamento de todos os dados fornecidos foram, primeiramente, realizados scripts em Python para o processamento, parsing, manipulação e normalização dos dados. 

## Anexos
### Manual de Utilização
1. Clone o repositório para a sua máquina e mova-se para a pasta do projeto:
```bash
git clone https://github.com/GVarelaa/ENGWEB2023-Projeto.git
cd ENGWEB2023-Projeto
```


Para simplificar a importação dos dados, foi criado um script para criar a base de dados e as suas coleções, efetuando o respetivo povoamento da mesma. 
1. Mova-se para a pasta ``data``:

```bash
cd data
```

2. Conceda permissões ao script:
```bash
chmod +x povoamento.sh
```

3. Execute o script:
```bash
./povoamento.sh
```

Para simplificar o arranque da aplicação, composta por vários serviços que precisam de interagir entre si, foi utilizado o Docker Compose. Através da definição das configurações no ficheiro ``docker-compose.yml``, o Docker Compose cria e inicia automaticamente todos os containers necessários, configurando também a comunicação entre eles.

Para executar os servidores do projeto na sua máquina local:
1. Verifique se o Docker e o Docker Compose estão instalados.

2. Na pasta do projeto, construa e inicie os containers para correr o projeto:
   
Para correr em modo detached (segundo plano):
```bash
docker-compose up -d --build
```
Para ter acesso aos logs (primeiro plano):
```bash
docker-compose up --build
```

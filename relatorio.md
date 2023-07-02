# Base de Dados de Acordãos

#### Universidade do Minho
#### Licenciatura em Engenharia Informática

#### Trabalho Prático - Engenharia Web

#### Autores:
- A96455 - Nuno Guilherme Cruz Varela - [@GVarelaa](https://github.com/GVarelaa)
- A97393 - Gabriela Santos Ferreira da Cunha - [@gabrielasfc](https://github.com/gabrielasfc)
- A97496 - Miguel Ângelo Silva Senra - [@MiguelSenra](https://github.com/MiguelSenra)

## índice
- [Índice](#índice)
- [Introdução](#introdução)
- [Arquitetura Aplicacional](#arquitetura-aplicacional)
   - [Autenticação](#autenticação)
   - [API de Dados](#api-de-dados)
   - [Interface](#interface)
- [Conclusão](#conclusão)
- [Anexos](#anexos)



## Introdução
No âmbito do projeto da unidade curricular de Engenharia Web, foi desenvolvida uma plataforma de auxílio ao Ministério da Justiça Português, com vista a unanimizar a consulta dos conjuntos de acórdãos que cada tribunal, com autonomia própria, disponibiliza periodicamente.
Cada tribunal tem a sua própria base de dados, resultando num conjunto distinto de 14 ficheiros JSON. Incialmente, foi efetuado o tratamento destes dados e criada uma base de dados unificada. Em seguida, foram desenvolvidos os serviços de autenticação e API, com recurso ao Express.js, e interface, utilizando React. 

## Manipulação dos Dados
Para ser possível realizar o carregamento de todos os dados fornecidos foram, primeiramente, realizados scripts em Python para o processamento, parsing, manipulação e normalização dos dados. 


## Arquitetura Aplicacional
A solução arquitetural concebida baseia-se em 3 serviços aplicacionais heterogéneos, proporcionando uma melhor manutenção e escabilidade do projeto e facilitando o seu desenvolvimento. Cada serviço contém funcionalidades específicas e desempenha um diferente papel no funcionamento da aplicação. 

### Autenticação
O serviço de autenticação é destinado ao registo e autenticação dos utilizadores, garantindo a segurança da aplicação. Sendo independente dos dados relativos aos acórdãos, pudemos começar o desenvolvimento deste serviço enquanto efetuavamos o tratamento dos dados. Para gerir os utilizadores e as respetivas sessões foram utilizados os módulos passport-local e jsonwebtoken. Através da atribuição de um token a cada utilizador, garantimos que apenas utilizadores autorizados podem aceder a determinadas rotas e realizar ações específicas, de acordo com os seus níveis de acesso. A coleção dos utilizadores é formada por documentos com os seguintes campos:

| Método | Rota    | Descrição |
| GET | /users     | Devolve os utilizadores presentes na coleção de utilizadores |
| GET | /users/:id | Devolve um utilizador consoante o id passado no parâmetro |
| GET | /users/:id/favorites | Devolve os favorites de um utilizador passado como parâmetro |
| GET | /users/check-email/:email | Verifica se o email passado como parâmetro já existe |
| GET | /users/check-username/:username | Verifica se o username passodo como parâmetro já existe |
| GET | /users/login/facebook | Redireciona para a autenticação por Facebook |
| GET | /users/login/facebook/callback | Rota callback da autenticação do Facebook |
| GET | /users/login/google | Redireciona para a autenticação por Google |
| GET | /users/login/google/callback | Rota callback da autenticação do Google |
| POST | /users | Adiciona um utilizador à coleção de utilizadores |
| POST | /users/register | Adiciona um utilizador à coleção de utilizadores (registo) |

### API de Dados
Diretamente conectado à base de dados, este serviço é responsável pelo armazenamento e gestão dos dados da aplicação. A base de dados foi criada com recurso ao software MongoDB, armazenando informações dos utilizadores e dos acórdãos. A API fornece, assim, endpoints para a leitura, criação, atualização e exclusão de dados, permitindo que a aplicação interaja com a base de dados de forma segura e eficiente. Todo este serviço encontra-se protegido de forma a que os pedidos só possam ser realizados sob a existência de token válido. Para além disso, existem verificações relativas ao nível de acesso do utilizador correspondente ao token, uma vez que alguns pedidos são exclusivos a uma determinada gama de
utilizadores.


### Interface
O serviço mais próximo do utilizador é responsável pela construção de uma interface gráfica a apresentar aos clientes da aplicação. É sobre esta interface que os clientes podem efetuar os seus pedidos, sendo, depois, reencaminhados para os restantes serviços, através de rotas definidas.

## Conclusão
Neste projeto pudemos realmente aprender como se constroi uma aplicação web assente em vários microserviços que se articulam entre si para fornecer um serviço único para o cliente. Durante o processo de desenvolvimento, deparámo-nos com algumas dificuldades como a necessidade de articulação entre duas bases de dados. Contudo, acreditamos que as dificuldades foram ultrapassadas com sucesso, o que contribuiu para que fossem atingidos todos os objetivos estipulados para o projeto.

## Anexos
### Manual de Utilização

Para simplificar o arranque da aplicação, composta por vários serviços que precisam de interagir entre si, foi utilizado o Docker Compose. Através da definição das configurações no ficheiro ``docker-compose.yml``, o Docker Compose cria e inicia automaticamente todos os containers necessários, configurando também a comunicação entre eles. Para simplificar a importação dos dados, foi criado um script para criar a base de dados e as suas coleções, efetuando o respetivo povoamento da mesma.

1. Clone o repositório para a sua máquina e mova-se para a pasta do projeto:
```bash
git clone https://github.com/GVarelaa/ENGWEB2023-Projeto.git
cd ENGWEB2023-Projeto
```

2. Verifique se o Docker e o Docker Compose estão instalados.

3. Na pasta do projeto, construa e inicie os containers para correr o projeto:

Para correr em modo detached (segundo plano):
```bash
docker-compose up -d --build
```
Para ter acesso aos logs (primeiro plano):
```bash
docker-compose up --build
```

5. Mova-se para a pasta ``data``:
```bash
cd data
```

6. Conceda permissões ao script:
```bash
chmod +x povoamento.sh
```

7. Execute o script:
```bash
./povoamento.sh
```

8. A aplicação deverá estar dispinível em: [localhost:8073/](https://localhost:8073/)




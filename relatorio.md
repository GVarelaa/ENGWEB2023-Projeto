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
Antes de poder começar a realizar o tratamento dos dados, diretamente, foi necessário realizar uma análise e uma investigação sobre os dados que tínhamos em mãos. O nosso conhecimento pela área não é muito grande pelo que foi necessário fazer uma investigação acerca do significado de cada um. 
Desta forma, conseguimos gerar um ficheiro que indicava todos os campos distintos que um ficheiro possuía juntamente com o tipo de dados que guardava verficando se existia algum tipo de inconsistência no tipo de dados dentro do mesmo ficheiro que acabou por nunca se verificar.


##Agrupamento dos valores em dicionários
Ao verificar os campos de cada um dos ficheiros através do relatório gerado no tópico anterior, verificámos que alguns dos ficheiros possuíam informação que era única daquele acórdão e não apareciam em mais nenhum. Pelo que apurámos, segundo o url que foi disponibilizado, aquelas informações pertencem ao atributo 'Decisão Texto Integral'. Assim, de forma a distinguir estes atributos dos outros, para uma melhor organização aquando da apresentação do acórdão, construímos um novo atributo cujo nome é "Informação Auxiliar" que é um dicionário com toda esta informação extra. Assim, para além de poder tratar destes casos, será possível disponibilizar na interface uma forma do utilizador guardar dados que não se enquadram nos principais mas que o mesmo pode considerar fazer sentido para aquele acórdão.

##Análise de acórdãos repetidos
Durante a análise, apercebemo-nos da presença de alguns registos que estavam duplicando, possuindo exatamente os mesmos campos e os mesmos valores. Desta forma, utilizámos um script que percorria todos os registos de cada um dos ficheiros verificando se havia registos duplicados.


##Correção de nomes de atributos para alguns valores
Através da visualização manual de alguns dos ficheiros foi possível notar que alguns atributos possuíam um valor não correspondente ao tipo de atributo. Para além de causar problemas na hora de observar os campos do acórdão, que apesar de não ser da nossa responsabilidade pode ser corrigido, poderia causar dúvida em quem por vezes estivesse a adicionar novos acórdãos à base de dados. Este processo foi realizado manualmente, pelo que não é garantido que todas as inconsistências fossem corrigidas. Para resolver este problema utilizámos a funcionalidade find and replace disponibilizada pela ferramenta utilizada.

##Limpeza de Campos Vazios
Foi também possível observar que alguns campos no respetivo valor possuíam uma string vazia, ou seja, sem qualquer informação relevante ao processo. Considerando que iremos utilizar uma base de dados não relacional, o MongoDB, não necessitamos de colocar todos os campos, tendo eles valor ou não na base de dados. 

##Limpeza da variável texto Integral
Durante a análise, houve um caso que nos surpreendeu. Na maior parte dos \emph{datasets}, percebemos a existência de 2 variáveis que estavam relacionadas. Em primeiro lugar, tínhamos a variável 'Texto Integral' e depois a variável 'Decisão Texto Integral'. A primeira variável é uma variável booleana, que apenas possuía 2 valores (S(Sim) e N(Não)). Quando o valor desta variável era N, não existia o segundo atributo, mas se esta possuísse o valor S, então o atributo 'Decisão Texto Integral' já estava presente. Desta forma, este campo booleano pode ser removido visto que o valor do segundo atributo é auto-suficiente e pode ser guardado tal como está,sem ser necessária qualquer outro tipo de informação que indique a presença do mesmo.

##Junção de campos que eram semelhantes 
De forma a garantir uma uniformização da nossa base de dados, sem possuir ambiguidades nem redundâncias, e de forma a permitir uma uniformização da informação de cada um dos acórdãos, foi necessário determinar os campos cujo nome era diferente mas o valor era correspondente ao mesmo atributo. Houve um exemplo que foi muito claro. Em alguns dos tribunais existia o atributo "Data do Acordão" e noutros existia o atributo "Data do Acórdão". Numa uniformização automática não era possível resolver este problema pelo que estes casos foram tratados individualemente através de outros scripts..

##Tratamento das datas
As datas ao longo dos vários ficheiros apresentavam um formato fora do convencional (mm/dd/aaaa). Consequentemente, de forma a minimizar possíveis ambiguidades tanto no lado do cliente como no nosso, decidimos alterar para o formato mais utilizado (dd/mm/aaaa). Para realizar este processo utilizámos, mais uma vez, o script muda_data.py. Para além da troca de ordem do mês e do dia, houve também a necessidade de também alterar o separador dos valores em alguns campos, podendo até ser dentro do mesmo ficheiro (mm-dd-aaaa). Ainda assim, de forma a prevenir outros formatos que pudessem aparecer e não fossem observados por nós colocámos uma secção no \emph{script} de forma a visualização a formatação da data que aparecia. O script, já foi resultado do tratamento de um dos ficheiros de pelo que já podemos ver alguns dos formatos que estavam disponíveis. Os primeiros 3 já foram apresentados acima. De notar ainda um quarto formato que apareceu onde o ano era apenas definido por 2 dígitos e não 4. Isto foi visualizado com a tal secção extra que mostrou este formato já que não se enquadrava em nenhum dos anteriores. Neste caso, como na visualização, foi visível o aparecimento de anos antes de 2000, então forçámos o aparecimento do ano (19xx). 

##Tratamento dos campos em listas
Foi possível denotar, durante a análise de dados que alguns nos campos correspondiam na verdade a listas, mas estavam expressos numa única string onde os vários valores estavam agrupados por separadores. Dentro de cada ficheiro, o separador era praticamente igual para todos os campos podendo haver uma ou outra exceção. Para tal, realizámos uma análise para verificar quais os separadores de cada um dos ficheiros, Este foi dos processos mais demorados do tratamento mas foi daqueles que permitiu uma melhor usabilidade e uniformização dos dados do sistema. 

##Referência a outros acórdãos
Houve algumas situações que nos chamaram à atenção. Em alguns atributos de acórdãos do tribunal da relação de Lisboa, foi visível que o seu valor era "ver acórdão STJ". A nossa primeira suspeita foi que se pudesse tratar da identificação de um outro acórdão o que poderia ser interessante, visto que futuramente poderia permitir a navegação entre vários acórdãos. 
FALAR DO PROCESSAMENTO A REALIZAR.

- remoção de campos desnecessários
Alguns dos atributos presentes nos acórdãos referenciavam a data/ano em que o acórdão se tornou disponível. Também foi possível observar que todos os registos possuíam o atributo url que era referente ao \emph{link} onde o acórdão estava disponível no seu sistema. Considerando que o nosso objetivo é agregar toda esta informação numa única base de dados de forma a que este pudesse ser o sistema judicial único, a referência a outros sistemas passaria a não fazer sentido pelo facto de toda a informação estar lá disponibilizada. 

- Escolha da chave principal 
Antes de realizar a importação dos registos para o \emph{mongodb}, necessitámos de definir um identificador $"$\_id$"$. Analisando todos os campos que tínhamos disponíveis, aquele que nos pareceu mais propício era o campo 'Processo'. Para tal, teríamos que garantir que os mesmo não possuía valores duplicados. Através de um \emph{script python} fizemos essa verificação dentro de cada um dos ficheiros de base de dados. No entanto, alguns valores de Processo apareciam repetidos, o que inviabilizou esta abordagem. Assim, considerando que nenhum dos outros campos pertencia a todos os registos e os que pertenciam também não eram únicos, adotámos a estratégia de definir o campo para cada um dos acórdãos através de um contador.  

- Concatenação de ficheiros

Com todas estas alterações foi possível garantir uma redução do tamanho da base de dados o que depois irá ter com certeza influência do tempo de resposta às \emph{queries} para apresentar informação na interface.


## Arquitetura Aplicacional
A solução arquitetural concebida baseia-se em 3 serviços aplicacionais heterogéneos, proporcionando uma melhor manutenção e escabilidade do projeto e facilitando o seu desenvolvimento. Cada serviço contém funcionalidades específicas e desempenha um diferente papel no funcionamento da aplicação. 

### Autenticação
O serviço de autenticação é destinado ao registo e autenticação dos utilizadores, garantindo a segurança da aplicação. Sendo independente dos dados relativos aos acórdãos, pudemos começar o desenvolvimento deste serviço enquanto efetuavamos o tratamento dos dados. Para gerir os utilizadores e as respetivas sessões foram utilizados os módulos passport-local e jsonwebtoken. Através da atribuição de um token a cada utilizador, garantimos que apenas utilizadores autorizados podem aceder a determinadas rotas e realizar ações específicas, de acordo com os seus níveis de acesso. A coleção dos utilizadores é formada por documentos com os seguintes campos:

| Método | Rota    | Descrição |
| -------|---------|-----------|
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
| POST | /users/login | Autentica um utilizador |
| POST | /users/image/:id | Guarda uma imagem de um utilizador passado por parâmetro |
| PUT | /users/:id | Altera as informações de um utilizador
| PUT | /users/:id/password | Altera a password de um utilizador |
| PUT | /users/:id/favorites | Adiciona um favorito ao utilizador passado por parâmetro |
| PUT | /users/:id/removeFavorite | Remove um favorite ao utilizador passado por parâmetro |
| DELETE | /users/:id | Remove um utilizador passado por parâmetro da coleção |

### API de Dados
Diretamente conectado à base de dados, este serviço é responsável pelo armazenamento e gestão dos dados da aplicação. A base de dados foi criada com recurso ao software MongoDB, armazenando informações dos utilizadores e dos acórdãos. A API fornece, assim, endpoints para a leitura, criação, atualização e exclusão de dados, permitindo que a aplicação interaja com a base de dados de forma segura e eficiente. Todo este serviço encontra-se protegido de forma a que os pedidos só possam ser realizados sob a existência de token válido. Para além disso, existem verificações relativas ao nível de acesso do utilizador correspondente ao token, uma vez que alguns pedidos são exclusivos a uma determinada gama de utilizadores. Este serviço tem ainda acesso às seguintes coleções presentes na base de dados:
- **Acordãos (acordaos)** : coleção que contém informação sobre todos os acordãos
- **Utilizadores (users)** : coleção que possui todos os utilizadores registados
- **Campos (fields)** : coleção que contém todos os campos que podem estar presentes nos acordãos
- **Tribnais (tribunals)** : coleção que contém todos os tribunais e respetivos descritores
- **Detalhes dos campos (acordaos_details)** : coleção com informação relativa aos vários campos dos acordãos


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




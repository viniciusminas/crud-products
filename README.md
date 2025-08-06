# CRUD Products - API em Java com Spring Boot

Este projeto é uma API RESTful desenvolvida em Java com Spring Boot que realiza operações básicas de CRUD (Criar, Listar, Atualizar e Deletar) de produtos. A API foi pensada para ser consumida por um front-end desenvolvido com HTML, JavaScript e, futuramente, com React e TypeScript.

## Funcionalidades

- Cadastrar um novo produto
- Listar todos os produtos
- Atualizar os dados de um produto
- Remover um produto por ID

## Tecnologias utilizadas

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

## Endpoints da API

| Método | Endpoint         | Descrição                |
|--------|------------------|--------------------------|
| POST   | `/produtos`      | Cadastrar um produto     |
| GET    | `/produtos`      | Listar todos os produtos |
| PUT    | `/produtos/{id}` | Atualizar um produto     |
| DELETE | `/produtos/{id}` | Deletar um produto       |

## Como executar o projeto localmente

### Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Java 17+](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)
- [PostgreSQL](https://www.postgresql.org/download/) em execução  
  > Certifique-se de que o banco está ativo e acessível nas configurações definidas no `application.properties`.

---

### Passo a passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/viniciusminas/crud-products.git
   cd crud-products

### Configure o banco de dados

Edite o arquivo `src/main/resources/application.properties` com os dados corretos de acesso ao PostgreSQL:

```properties-exemplo```
spring.datasource.url=jdbc:postgresql://localhost:5432/seu_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha


### Execute a aplicação

Com o Maven Wrapper (sem precisar instalar Maven globalmente):

Ou, se já tiver o Maven instalado:

mvn spring-boot:run


### Acesse a API

Após a inicialização, a API estará disponível em:

http://localhost:8080


### Abrir o frontend

Navegue até a pasta frontend e abra o arquivo index.html diretamente no navegador:

crud-products/frontend/index.html

### Dica: 

Se estiver utilizando a IDE do VSCode, instale a extensão Live Server para facilitar o desenvolvimento frontend com recarregamento automático. 




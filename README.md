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

- Java 17+
- Maven
- PostgreSQL em execução

### Passos

```bash
# Clone o repositório
git clone https://github.com/viniciusminas/crud-products.git
cd crud-products

# Compile e execute a aplicação
./mvnw spring-boot:run

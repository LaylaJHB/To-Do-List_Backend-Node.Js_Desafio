<p align="center">
<img src="https://img.shields.io/github/last-commit/LaylaJHB/To-Do-List_Backend-Node.Js_Desafio"/> <img src="https://visitor-badge.laobi.icu/badge?page_id=LaylaJHB.To-Do-List_Backend-Node.Js_Desafio" />
<img src="https://img.shields.io/github/created-at/LaylaJHB/To-Do-List_Backend-Node.Js_Desafio"/> <a href="https://portifolio2024-bay.vercel.app"><img width="90px" src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=black")] (https://portifolio2024-bay.vercel.app)
</p>
<br>
  
# Sistema de Gerenciamento de Tarefas

---

## 🕵Desafio

Desenvolvimento de API CRUD

---

## 🧑‍🚀Tema

Sistema de Gerenciamento de Tarefas

---

## 🧭Status

- Projeto: feito e aprovado
- Resultado da Seleção para vaga Backend Developer II: aprovada (selecionada para a vaga)

---

## Status do Projeto após aprovação

- ⏳ Adicionando features

---

## 🎯Objetivo do Projeto

Criar uma API RESTful completa, demonstrando sua capacidade de desenvolvimento em um ambiente realista. A API será um sistema de gerenciamento de tarefas.

- [✅] Cadastro de Tarefas: Cada tarefa deve conter um título, descrição e status (pendente, em andamento, concluída).
  Utilize um banco de dados de sua escolha: SQL (por exemplo, MySQL) ou não-relacional (por exemplo, MongoDB).título, descrição e status (pendente, em andamento, concluída).
- [✅] Listagem de Tarefas: Os usuários devem poder listar todas as tarefas cadastradas.
- [✅] Atualização de Tarefas: Os usuários devem poder atualizar detalhes e status de uma tarefa existente.
- [✅] Exclusão de Tarefas: Os usuários devem poder excluir uma tarefa.

---

## ☑️Requisitos Técnicos

- [✅] Utilize Node.js e Express para criar a API.
- [✅] Organize o código utilizando o padrão MSC (Model-Service-Controller).
- [✅] Integre autenticação JWT para proteger as rotas de atualização e exclusão de tarefas.
- [✅] Utilize um banco de dados de sua escolha: SQL (por exemplo, SQLite, PostgreSQL) ou não-relacional (por exemplo, Firebase Realtime Database).
- [✅] Implemente endpoints de busca e filtro para as tarefas (por título, por status, etc.).
- [✅] Forneça documentação clara para a API, incluindo detalhes sobre as rotas, parâmetros e respostas. (Opcional)

---

## ☑️Critérios de Avaliação

O critério predominante neste desafio é a qualidade do código e a organização do projeto. Será avaliado como você segue as melhores práticas, mantém um código limpo e estruturado, e organiza a lógica de acordo com o padrão MSC.

---

## ☑️Entrega

Compartilhe o código-fonte do projeto através de um repositório no GitHub. Certifique-se de incluir um arquivo README que explique como configurar e executar o projeto localmente, instruções para instalação de dependências e detalhes sobre as rotas da API. O critério predominante neste desafio é a qualidade do código e a organização do projeto. Será avaliado como você segue as melhores práticas, mantém um código limpo e estruturado, e organiza a lógica de acordo com o padrão MSC.

---

## 🕵Resultados

## ✨ Criar usuário
Aqui apresento um pouco dos resultados obtidos e para começar o video abaixo mostra a criação do usuário com senha criptografada.
- Ferramenta de requisição: Postman
- Banco de dados: MySQL
- Tabela: to_do_list_users

https://github.com/user-attachments/assets/fac302fc-8edb-482f-b90d-3dafe37f7a60

<br>

## ✨ Login do usuário com validações
  O usuário precisa realizar login para que possa posteriormente criar tarefas. Aqui apresento pequenas validações de login durante a requisição e ao final o login realizado com sucesso.
- Ferramenta de requisição: Postman
- Banco de dados: MySQL
- Tabela: to_do_list_users

https://github.com/user-attachments/assets/ed2565cd-1f55-4d09-97e4-8c7ed5c5ec40

## ✨ Pegar todos os usuários
- Banco de dados: MySQL
- Tabela: to_do_list_users


https://github.com/user-attachments/assets/a7cf920b-1a59-4fa6-bef7-a33b1525e854





## ✨ Pegar task por título
- Banco de dados: MySQL
- Tabela: to_do_list_tasks

https://github.com/user-attachments/assets/ea8f4386-baac-47c7-b628-a674b1da863d



---





## 🛠Stack

- Back-end

---

## 🛠Arquitetura

Arquitetura de software em 3 camadas (3-tiers):

* Controller: camada de interface, comunicação.
* Bussiness: camada lógica, principal
* Database: armazenamento e gerenciamento dos dados/informações

---

## 🛠Tecnologias

Esse projeto foi desenvolvido com as seguintes ferramentas e tecnologias:

* Node.js
* Typescript
* SQL
* MySQL
* API
* Postman
* Knex
* Cors
* Express

---

## 💡Estrutura de Dados

**Para esse projeto são modelados duas entidades:**

- usuário (user)
- tarefa (task).

Cada uma com os seguintes dados:


| tarefa (task)                                       | usuário (user) |
| ----------------------------------------------------- | ----------------- |
| • id                                               | • id           |
| • title                                            | • name         |
| • description                                      | • email        |
| • deadline                                         | • password     |
| • status:*"pendente, "em_andamento e "concluída"* | -               |
| • created_at                                       | -               |
| • authorId                                         | -               |

---

## ⭕Endpoints

Todos os endpoints apresentados possuem exemplo de requisição e de resposta da requisição. Acesse a documentação para mais informações.

- Cadastrar usuário
- Realizar login do usuário
- Pegar todos os usuários cadastrados
- Pegar usuário por Id
- Deletar usuário
- Criar tarefa
- Atualizar tarefa
- Deletar tarefa
- Buscar todas as tarefas cadastradas
- Buscar tarefas pelo número da página
- Buscar tarefas filtradas por título
- Buscar tarefas filtradas por status
- Buscar tarefas filtradas por título e status
- Buscar tarefa específica pelo "id"

### 👤 Usuário

---

Os endpoints a seguir referentes a usuários devem ter seu "body" preenchidos na requisição e como resposta irão retornar "token" de autenticação que poderão ser usados em outras requisições. Acesse a documentação para ler detalhes sobre o preenchimento do _body_ e ler mais informações.

- Cadastro de usuário: http://localhost:3003/user/create
- Login de usuário: http://localhost:3003/user/login
- Pegar todos os usuários cadastrados: http://localhost:3003/user/getAll
- Pegar usuário por id: http://localhost:3003/user/getUserById/:id
- Deletar usuário: http://localhost:3003/user/deleteUserById/:id

</br>

### 🗒️ Tarefa

---

Os endpoints referentes a tarefas devem ter seu "body" preenchidos na requisição e como resposta irão retornar "token" de autenticação que poderão ser usados em outras requisições. Acesse a documentação para ler detalhes sobre o preenchimento do _body_ e ler mais informações.

- Criar tarefa: http://localhost:3003/task/create
- Atualizar tarefa: http://localhost:3003/task/updateTaskById/
  - params -> id
- Deletar tarefa: http://localhost:3003/task/deleteTaskById/
  - params -> id
- Buscar todas as tarefas: http://localhost:3003/task/getAllPosts
- Buscar tarefa por "id": http://localhost:3003/task/searchPost/
  - params -> id
- Buscar tarefas filtradas por título: http://localhost:3003/task/getAllPosts
  - query.params -> title
- Buscar tarefas filtradas por status: http://localhost:3003/task/getAllPosts
  - query.params -> status
- Buscar tarefas filtradas por título e status: http://localhost:3003/task/getAllPosts
  - query.params -> title
  - query.params -> status
- Buscar tarefas por paginação: http://localhost:3003/task/getAllPosts
  - query.params -> page

---

## 🔗Deploy

- **Link do Deploy no Render:** próximo passo

---

## 🔗Documentação

- **Link da Documentação no Postman:** https://documenter.getpostman.com/view/22349688/2s9YBxZbXr

---


## 🛠Próximos passos

- [    ] Aplicar busca ordenada
- [    ] Aplicar testes

- Refatorar arquiterura de 3 camadas para MSC (Controller, Service, Model, Database)

---

## 🛰Rodando o Projeto

Para Rodar o projeto, siga as seguintes etapas :

* **Acesse o terminal:** GitBash, Windows PowerShell ou outro

  * **Clone esse repositório:**
    ```
    git clone https://github.com/LaylaJHB/To-Do-List_Backend-Node.Js_Desafio.git
    ```
  * **Instale as dependências do projeto:** rode o comando
    ```
    npm install
    ```
* **Crie um arquivo com nome .env no diretório raiz do projeto:**

  ```
  touch .env
  ```
* **Acesse o arquivo .env, adicione as variáveis de ambiente e preencha as credenciais de acesso do seu Banco de Dados:**

  * `DB_HOST = `
  * `DB_USER = `
  * `DB_PASS = `
  * `DB_NAME = `
  * `PORT = 3306`

* Execute o script para criar as tabelas de usuários e tarefas, respectivemente:
    * to_do_list_users
    * to_do_list_tasks
* **Acesse novamente o terminal**

  * **Inicie o projeto:** rode o comando
    ```
    npm start
    ```

## **Rode os scripts abaixo para criar as tabelas e os dados**


## Scripts
  * migrate:latest: Aplica todas as migrações pendentes no banco de dados.
    ```
    npm run migrate:latest
    ```
  * migrate:rollback: Desfaz a última migração executada.
    ```
    npm run migrate:rollback
    ```

  
---

## 🧑‍🚀Autor

- Layla Janaína Hissa Borges

---

## 📝Sobre a Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

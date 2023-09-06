# Sistema de Gerenciamento de Tarefas

---

## 🕵Desafio

Desenvolvimento de API CRUD

## 🧑‍🚀Tema

Sistema de Gerenciamento de Tarefas

---

## 🔠Conteúdo

<!--ts-->

* [Sobre](#sobre)
* [Autor](#👩🏾-autor)
* [Status](#status)
* [Objetivo do Projeto](#objetivo-do-projeto)
* [Requisitos de Funcionalidade](#requisitos-de-funcionalidade)
* [Concepção do Projeto](#concepcao-do-projeto)
* [Link para Acessar](#link-para-acessar)
* [Rodando o Projeto](#rodando-o-projeto)
* [Sobre a Licença](#sobre-a-licença)

<!--te-->

---

## 🧭Status do Projeto

- ⏳ Fazendo

---

## 🎯Objetivo do Projeto

Criar uma API RESTful completa, demonstrando sua capacidade de desenvolvimento em um ambiente realista. A API será um sistema de gerenciamento de tarefas.

- [✅] Cadastro de Tarefas: Cada tarefa deve conter um título, descrição e status (pendente, em andamento, concluída).
  Utilize um banco de dados de sua escolha: SQL (por exemplo, MySQL) ou não-relacional (por exemplo, MongoDB).título, descrição e status (pendente, em andamento, concluída).
- [✅] Listagem de Tarefas: Os usuários devem poder listar todas as tarefas cadastradas.
- [✅] Atualização de Tarefas: Os usuários devem poder atualizar detalhes e status de uma tarefa existente.
- [✅] Exclusão de Tarefas: Os usuários devem poder excluir uma tarefa.

## ☑️Requisitos Técnicos

- [✅] Utilize Node.js e Express para criar a API.
- [✅] Organize o código utilizando o padrão MSC (Model-Service-Controller).
- [✅] Integre autenticação JWT para proteger as rotas de atualização e exclusão de tarefas.
- [✅] Utilize um banco de dados de sua escolha: SQL (por exemplo, SQLite, PostgreSQL) ou não-relacional (por exemplo, Firebase Realtime Database).
- [✅] Implemente endpoints de busca e filtro para as tarefas (por título, por status, etc.).
- [✅] Forneça documentação clara para a API, incluindo detalhes sobre as rotas, parâmetros e respostas. (Opcional)

## ☑️Critérios de Avaliação

O critério predominante neste desafio é a qualidade do código e a organização do projeto. Será avaliado como você segue as melhores práticas, mantém um código limpo e estruturado, e organiza a lógica de acordo com o padrão MSC.

## ☑️Entrega

Compartilhe o código-fonte do projeto através de um repositório no GitHub. Certifique-se de incluir um arquivo README que explique como configurar e executar o projeto localmente, instruções para instalação de dependências e detalhes sobre as rotas da API. O critério predominante neste desafio é a qualidade do código e a organização do projeto. Será avaliado como você segue as melhores práticas, mantém um código limpo e estruturado, e organiza a lógica de acordo com o padrão MSC.

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

## 💡Estrutura de Dados

Para esse projeto são modelados duas entidades : usuário (user) e tarefa (task).

Cada uma com os seguintes dados:

- Usuário (user):

  - id
  - name
  - email
  - password
- Tarefa (task):

  - id
  - title
  - description
  - deadline
  - status: *"pendente, "em_andamento e "concluída"*
  - created_at
  - authorId

---

## ⭕Endpoints

Todos os endpoints apresentados possuem exemplo de requisição e de resposta da requisição. Acesse a documentação para mais informações.

  - Cadastrar usuário

  - Realizar login do usuário

  - Criar tarefa

  - Atualizar tarefa

  - Deletar tarefa

  - Buscar todas as tarefas cadastradas

  - Buscar tarefa específica pelo "id"


### 👤 Usuário

---

Os endpoints a seguir referentes a usuários devem ter seu "body" preenchidos na requisição e como resposta irão retornar "token" de autenticação que poderão ser usados em outras requisições. Acesse a documentação para ler detalhes sobre o preenchimento do _body_ e ler mais informações.

- Cadastro de usuário: http://localhost:3003/user/create

- Login de usuário: http://localhost:3003/user/login


### 🗒️ Tarefa

---

Os endpoints referentes a tarefas devem ter seu "body" preenchidos na requisição e como resposta irão retornar "token" de autenticação que poderão ser usados em outras requisições. Acesse a documentação para ler detalhes sobre o preenchimento do _body_ e ler mais informações.

- Criar tarefa: http://localhost:3003/task/create

- Atualizar tarefa: http://localhost:3003/task/updateTaskById/

- Deletar tarefa: http://localhost:3003/task/deleteTaskById/382beb5b-c15e-4a45-bf40-23d0828a91d3

- Buscar todas as tarefas: http://localhost:3003/task/getAllPosts

- Buscar tarefa por "id": http://localhost:3003/task/searchPost/382beb5b-c15e-4a45-bf40-23d0828a91d3

Esses endopoints 


---

## 🔗Deploy

- **Link do Deploy no Render:**próximo passo

---

## 🔗Documentação

- **Link da Documentação no Postman:** https://documenter.getpostman.com/view/22349688/2s9YBxZbXr

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
* **Acesse o arquivo tables.sql**
  * Copie as queries de criação de tabelas
  * Cole em seu banco de dados
  * Execute o script para criar as tabelas de usuários e tarefas, respectivemente:
    * to_do_list_users
    * to_do_list_tasks      
    
* **Acesse novamente o terminal**
  * **Inicie o projeto:** rode o comando
    ```
    npm start
    ```
---

## 🧑‍🚀Autor

- Layla Janaína Hissa Borges

---

## 📝Sobre a Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

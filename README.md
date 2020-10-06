<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
  <p align="center">Projeto feito com o framework nest.</p>


## Descrição

Backend de um projeto simples de cadastro de usuários

## Rotas
- `GET /users`: Listar todos os usuários
```js
// Response: StatusCode: 200 (OK)
{
  timestamp: number,
  status: string,
  data: [
    {
      id: number,
      nome: string,
      idade: number,
      github: string,
      cep: number,
      login: string,
      avatarurl: string,
      urlperfil: string,
      endereco: {
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string
      }
    }
  ]
}
```

- `GET /users/:id`: Listar usuário pelo id
```js
// Request(Params):
{
  id: number
}
// Response: StatusCode: 200 (OK)
{
  timestamp: number,
  status: string,
  data: {
      id: number,
      nome: string,
      idade: number,
      github: string,
      cep: number,
      login: string,
      avatarurl: string,
      urlperfil: string,
      endereco: {
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string
      }
  }
}
```

- `POST /users`: Cadastro de um novo usuário
```js
// Request(Body):
{
  nome: string,
  idade: number,
  github: string,
  cep: number
}
// Response: StatusCode: 201 (Created)
{
  timestamp: number,
  status: string,
  data: {
      id: number,
      nome: string,
      idade: number,
      github: string,
      cep: number,
      login: string,
      avatarurl: string,
      urlperfil: string,
      endereco: {
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string
      }
  }
}
```

- `PUT /users/:id`: Atualizar task
```js
// Request(Body):
{
  nome: string,
  idade: number,
  github: string,
  cep: number
}
// Request(Params):
{
  id: number
}
// Response: StatusCode: 200 (OK)
{
  timestamp: number,
  status: string,
  data: {
      id: number,
      nome: string,
      idade: number,
      github: string,
      cep: number,
      login: string,
      avatarurl: string,
      urlperfil: string,
      endereco: {
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string
      }
  }
}
```

- `DELETE /users/:id`: Deletar task pelo id
```js
// Request(Params):
{
  id: number
}
// Response: StatusCode: 200 (OK)
```

## Instalação

```bash
$ npm install
```

## Env
Variaveis de ambiente
```yaml
dev:
  startItems: true
prod:
  startItems: false
```


## Execução
Para executar o projeto use:(Projeto rodando na porta: http://localhost:3000)


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
$ npm run test
```
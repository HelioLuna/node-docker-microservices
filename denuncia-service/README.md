# Denuncia Microservice

Protótipo de serviço utilizado para acessar os dados de denuncia cadastrados no banco de dados da Secretária de Estado da Saúde.
### Stack

Foi utilizado um ambiente simples construido com NodeJS e Docker for Windows.

- NodeJS v10.0.0
- Docker For Windows v18.03.0-ce

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Como rodar o microservice de denuncia

**Para rodar localmente**

É preciso ter o NodeJS instalado.

- instale as dependencias
```
$ npm install
```

- rodar os testes unitarios
```
$ npm test
```

- iniciar o serviço
```
$ npm start
```

- rodar os testes de integração (em outro terminal)
```
$ npm run integration-test
```
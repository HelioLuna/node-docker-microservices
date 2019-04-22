# Município Microservice

Protótipo de serviço utilizado para acessar os dados de municípios cadastrados no banco de dados da Secretária de Estado da Saúde.
### Stack

Foi utilizado um ambiente simples construido com NodeJS e Docker for Windows.

- NodeJS v9.8.0
- Docker For Windows v18.03.0-ce

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Como rodar o microservice de município

**Para rodar localmente**

É preciso ter o NodeJS instalado.

- instale as dependencias
```
$ yarn install --silent
```

- rodar os testes unitarios
```
$ yarn test
```

- iniciar o serviço
```
$ yarn start
```

- rodar os testes de integração (em outro terminal)
```
$ yarn run integration-test
```
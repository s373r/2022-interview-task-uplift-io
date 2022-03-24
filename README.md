# 💻 Interview task: [uplift.io](https://uplift.io/)

A server for blockchain indexes

Details: [interview-task.pdf](./assets/interview-task.pdf)

## Online-demo

> 💡 Please note:
>
> HTTP response caching (5 sec) is enabled for all API endpoints

https://interview-task-uplift-io-2022.herokuapp.com/

1. Will redirect to Swagger API documentation
2. Please use it to make API requests 

## 🚀 Run

> 💡 Please note: 
> 
> You have to pass `WEB3_HTTP_ENDPOINT=YOUR_INFURA_PROJECT_ENDPOINT` as an environment variable 

```shell
$ npm install
$ WEB3_HTTP_ENDPOINT=X npm run start:prod
```
## 🔨 Local development

```bash
# one-shot start
$ WEB3_HTTP_ENDPOINT=X npm run start

# watch mode
$ WEB3_HTTP_ENDPOINT=X npm run start:dev
```

Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## ✏️ Code conduction

This project uses [Gitmoji](https://gitmoji.carloscuesta.me) for commit messages

## 📄 License

[MIT](LICENSE)

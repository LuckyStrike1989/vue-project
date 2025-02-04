# lunchapp

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

> Docker

Dockerfile과 docker-compose.yml을 생성하는 명령을 Makefile에 추가했습니다. make Dockerfile 또는 make docker-compose.yml을 실행하면 해당 파일이 자동으로 생성됩니다. 필요에 따라 내용을 수정하거나 추가할 수 있습니다.

또는

1. docker pull mariadb:11.6.2
2. docker run --name mariadb-container -e MYSQL_ROOT_PASSWORD=1234 -d -p 3308:3306 mariadb:11.6.2
3. docker exec -it mariadb-container mysql -u root -p

---

- build: Dockerfile을 빌드하여 mariadb:11.6.2-ubu2404 이미지를 생성
- up: docker-compose up -d를 실행하여 컨테이너를 백그라운드에서 실행
- down: docker-compose down을 실행하여 컨테이너를 종료
- clean: 컨테이너 및 볼륨 제거 후 이미지 삭제
- logs: 실행 중인 컨테이너의 로그를 실시간으로 출력

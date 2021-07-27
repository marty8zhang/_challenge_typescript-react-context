# Get Started

## Locally

```shell
$ yarn install -s
$ yarn start
```

## Docker & Docker Compose

```shell
$ docker-compose -f "docker-compose.yml" up -d --build
```

# Assumptions

- All defined model fields are mandatory.

- `UserNameFilterContext` is only for demonstration purposes, e.g., how to use multiple contexts in
  an app. For this particular challenge, filtered results and filter input change handling could've
  been done in the parent component solely and pass down as `props`.

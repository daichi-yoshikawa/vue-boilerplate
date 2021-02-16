# vue-boilerplate
Boilerplate of vue frontend.

## Requisites
nodejs must be installed, OR docker and docker-compose are needed.

## Show the first page with Docker
You run docker container and you can build vue project in it. Once you successfully execute the follows, you'll get into the container in bash mode.
```
$ cd /root/dir/of/boilerplate
$ rm -rf node_modules <-- If node_modules dir already exists
$ docker-compose build
$ docker-compose run node
```
Note: you may encounter errors because of .bash_history or .config directory which are created by the container. You can delete those with sudo and try the above again.

In the container, you need to do the follow to install all packages listed in package.json.
```
$ npm install
```
Note: Everytime you install new node packages, you'll install them in the container (if you decide to use container to build vue project).

And then build project. If succeeds, you'll see dist directory at root dir.
```
(If for development)
$ npm run build:dev
(If for production)
$ npm run build:pro
```

In case of that you used build:dev, you stop "watch mode" by keyboard interruption, that is, "Ctrl+C"(if linux).

Launch http-server for test.
```
$ npm run serve
```

Open a major browser and input "localhost:8080" in URL bar. You'll see entry page of the sample website.

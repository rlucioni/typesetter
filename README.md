# typesetter

Flask and React application for help playing Letterpress.

## Getting Started

Create a virtual environment:

```
$ python3 -m venv venv
$ source venv/bin/activate
```

Use [nvm](https://github.com/creationix/nvm) to activate the expected version of node:

```
$ nvm use
```

Install requirements:

```
$ inv requirements
```

Serve the site and open it in a browser:

```
$ inv serve
```

Compile static assets and watch for changes:

```
$ inv static
```

To list all available tasks:

```
$ inv -l
```

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

Serve the site, open it in a browser, and watch for changes, refreshing the browser when changes are detected:

```
$ inv stream
```

To list all available tasks:

```
$ inv -l
```

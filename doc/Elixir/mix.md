# `mix`
## пакетный менеджер языка [[Elixir/Elixir]]

## sup
```
$ mix new . --sup --app simple_server
```

Breaking this command down: 
- `new .` tells [[mix]] to create a new project structure in the current directory 
- `--sup` tells mix that this is going to be a “supervised” application.

Since we’re building an HTTP server, choosing to have a [[supervisor]] manage the main server process is a great idea because that supervisor process will handle the starting and stopping of the server.

Lastly, `--app simple_server` tells [[mix]] to use the name `simple_server` for the application/project we’re creating.

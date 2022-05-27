# Elixir/ `application`

## basics

**OTP application** is basically a component that has predefined behaviour. It can be started, loaded or stopped. To create an OTP application in [[Elixir]], we use the [[Elixir/Application]] module and implements some of the expected behavior. For more you can always refer to the documentation of [Application](https://hexdocs.pm/elixir/Application.html).

## files

-   `lib/` - Where our application code will live
-   `lib/simple_server/application.ex` - Where we’ll describe how the [[Elixir/Application]] should be started and how it should be supervised
-   `mix.exs` - Where we’ll describe the configuration of our application and it’s dependencies Now that Mix has scaffolded up our project, let’s add the dependencies we need to set up our server.

https://code.tutsplus.com/articles/elixir-applications--cms-29598

## startup

```elixir
defmodule Sample.App do
  use Application
  def start(_type, _args) do
    children = []
    opts = [strategy: :one_for_one, name: Sample.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```

The `start/2` function must either return `{:ok, pid}` (with an optional state as the third item) or `{:error, reason}`.

```elixir
# /mix.exs
def application do
  [
    extra_applications: [:logger],
    mod: {SampleApp.App, []} # Add in this line of code
  ]
end
```

# `Plug`
## a specification and conveniences for composable modules between web applications

- [[mime]]
- [[plug]]
- [[plug_crypto]]
- [[Elixir/telemetry]]

## /lib/plug.ex

```elixir
defmodule Asta.Plug do
  import Plug.Conn

  def init(options) do
    options
  end

  def call(conn, _opts) do
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(200, "Hello world\n#{NaiveDateTime.utc_now()}")
  end
end
```

run with: 

```
iex(1)> Plug.Adapters.Cowboy.http Asta.Plug,[]
```

next: [[Basic of OTP Application]]

## Router

### `/lib/asta/app.ex`

```elixir
defmodule Asta.App do
  use Application

  def start(_type, _args) do
    children = [
      Plug.Adapters.Cowboy.child_spec(
        scheme: :http,
        plug: Asta.Router,
        options: [port: 12345]
      )
    ]

    opts = [strategy: :one_for_one, name: Asta.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
```

### `/lib/asta/router.ex`

```elixir
defmodule Asta.Router do
  use Plug.Router

  plug Plug.Static, at: "/static", from: "static"

  plug :match
  plug :dispatch

  get "/" do
    conn = put_resp_content_type(conn, "text/html")
    send_file(conn, 200, "static/index.html")
  end

  match _ do
    send_resp(conn, 404, "not found")
  end

end
```


### next: [[Elixir/plug/dive]]
defmodule Hanzi.App do
  use Application
  require Logger

  def start(_type, _args) do
    # Hanzi.Telemetry.setup()
    port = Application.get_env(:hanzi, :port, 14735)

    Logger.info(inspect({__MODULE__, :web, " http://127.0.0.1:#{port} "}))

    children = [
      {
        Plug.Cowboy,
        scheme: :http, plug: Hanzi.Router, options: [port: port]
      }
    ]

    opts = [strategy: :one_for_one, name: __MODULE__]
    Supervisor.start_link(children, opts)
  end
end

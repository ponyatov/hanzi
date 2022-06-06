defmodule Hanzi.Telemetry do
  require Logger

  def setup do
    Logger.debug(inspect({__MODULE__, :setup}))

    events = [
      # [Hanzi.Router, :start],
      [Hanzi.Router, :stop]
    ]

    :telemetry.attach_many(
      "telemetry-instrumenter",
      events,
      &__MODULE__.handle_event/4,
      nil
    )
  end

  def handle_event([Hanzi.Router, _], measure, conn, _config) do
    %{
      duration: duration
    } = measure

    %{
      conn: %Plug.Conn{
        host: host,
        method: method,
        path_info: path_info,
        remote_ip: remote_ip
      }
    } = conn

    metric = %{
      host: host,
      remote_ip: remote_ip,
      method: method,
      path: path_info |> Enum.join("/"),
      duration: duration
    }

    Logger.debug(inspect({Hanzi.Router, metric}))
  end

  def handle_event(name, measure, meta, config) do
    Logger.info(inspect({name, measure, meta, config}))
  end
end

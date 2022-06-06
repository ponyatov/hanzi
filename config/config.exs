import Config

config :logger, :console,
  level: :info,
  format: "\n$date $time [$level] $metadata$message",
  metadata: [:user_id]

import_config "config.#{Mix.env()}.exs"

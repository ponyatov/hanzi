defmodule Hanzi.MixProject do
  use Mix.Project

  def project do
    [
      app: :hanzi,
      version: "0.0.1",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      erlc_include_path: "inc"
    ]
  end

  def application do
    [
      mod: {Hanzi.App, []},
      extra_applications: [
        # :sync,
        :logger,
        :cowboy,
        :plug
      ]
    ]
  end

  defp deps do
    [
      # {:sync, "~> 0.2"},
      {:cowboy, "~> 2.0"},
      {:plug, "~> 1.0"},
      {:plug_cowboy, "~> 2.0"},
      {:pinyin, "~> 0.1.4"}
    ]
  end
end

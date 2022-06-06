# `Application.get_env`

```elixir
port = Application.get_env(:web, :port, 12345)
```

```elixir
def project do
	[
		app: :web,
```
```elixir
def application do
	[
		mod: {Web.Application, []},
		env: [port: 46526],
		extra_applications: [
			:logger,
			:cowboy,
			:plug
		]
	]
end
```

- `web` -> project / app
- `port` -> application / env / port
- `12345` -> falback-вариант


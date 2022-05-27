# `sync`
## Automatic Code Reloader

https://hex.pm/packages/sync


### [[Elixir/restart]] manually in [[iex]]

- Erlang VM [[init/restart|:init.restart]]
- [[Erlanf/gen_server/code_change]] callback

## Make [[Elixir]] app recompile and reload on source code change

https://stackoverflow.com/questions/32540703/make-elixir-app-recompile-and-reload-on-source-code-change

## setup

```elixir
def application do
	[
		mod: {Hanzi.App, []},
		extra_applications: [
			:logger,
			:sync
		]
	]
end

defp deps do
	[
		{:sync, "~> 0.2"}
	]
end
```

## about

Sync is a developer utility. It recompiles and reloads your [[Erlang]] code on-the-fly. With Sync, you can code without friction.

What does "code without friction" mean? It means that with Sync running, you no longer need to worry about running `make`, or `c:l(Module)` again. Write code, save the file, and watch as Erlang automatically detects your changes, recompiles the code, and reloads the module.


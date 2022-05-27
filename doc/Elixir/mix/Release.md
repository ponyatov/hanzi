# [[mix]] Release

https://elixir-lang.org/getting-started/mix-otp/config-and-releases.html


## Building [[Elixir]] releases

Since [[Elixir/ver/1/9]], mix has [built in support](https://hexdocs.pm/mix/Mix.Tasks.Release.html) for creating releases. For earlier versions, use the [Distillery](https://github.com/bitwalker/distillery) library.

Configure your release in `mix.exs`.

```elixir
def project do   [     
	app: :foo,     
	releases: [       
		prod: [
			include_executables_for: [:unix],
			steps: [:assemble, :tar]       
	]]]
end
```

`rel/vm.args.eex` sets [[Erlang/VM/startup arguments]]. We normally tune it to [increase TCP ports](https://www.cogini.com/blog/tuning-tcp-ports-for-your-elixir-app/) for high volume apps.

Generate a template in your project under `rel`:

`mix release.init`

Edit it as needed, then build the release with [[MIX_ENV]]:

`MIX_ENV=prod mix release`

This creates a tarball with everything you need to deploy:

`_build/prod/foo-0.1.0.tar.gz`

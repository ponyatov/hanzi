# `Logger`

**By default, `Logger` is included with your application!**

Remember back to our `mix.exs` file where we saw this bit of configuration:

```elixir
def application do
  [
    extra_applications: [:logger]
  ]
end
```

Before we can do that, we'll need to require [[Logger]] into our [[Elixir/Application]], so up at the top, below the `use Application` line, add the following line:

```
require Logger
```

Next, we'll modify the log function to call out via Logger.debug:

```elixir
defmodule Hanzi.App do
	use Application
 
	require Logger

	def start(_type, _args) do
		Logger.debug inspect {Hanzi.App, :start}
```


```elixir
defp log do
  Logger.debug "Starting Application..."
end
```

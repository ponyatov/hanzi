# `IO.puts()`
`IO.puts` takes either one or two arguments.
- the first argument of `IO.puts/2` is an atom specifying
	- the destination of the message
		- for example, [[Erlang/stdout|:stdout]] or [[Erlang/stderr|:stderr]]. 
- If you're using the `IO.puts/1`, then the destination is assumed to be `:stdout` and the message will just be output directly.

For example, the line of code that we already have in our `log/0` function is:
```elixir
defp log do
  IO.puts "Starting Application..."
end
```

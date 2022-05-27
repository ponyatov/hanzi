# `IO.inspect()`

`IO.inspect` is a different beast. While [[IO.puts]] is expecting anything you pass to it to be a [[Elixir/String]] or string-compatible, `IO.inspect` can handle much more complex forms. You can actually see this really easily by adding the following line to your code: `IO.puts self()`. [[Elixir/self]] 

Attempting to run this will give you an error message similar to the following:

```
** (Protocol.UndefinedError) protocol String.Chars not implemented for #PID<0.130.0>.
```

Running `IO.inspect self()`, however, will work (although it's not the most useful output in the world).

```
iex(2)> IO.inspect self()
#PID<0.172.0>
```


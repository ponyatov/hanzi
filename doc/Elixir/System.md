# System

## `monotonic_time()`

```elixir
def some_function do
    start = System.monotonic_time()
    # do something that you want to measure
    stop = System.monotonic_time()
    record_measure("operation took: ", stop - start)
    # ...
end
```

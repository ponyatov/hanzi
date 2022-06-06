# Introduction to [[Elixir/Telemetry]] in [[Elixir]]

https://blog.miguelcoba.com/introduction-to-telemetry-in-elixir

Telemetry is the [...] collection of measurements [...] and their automatic transmission [...] for monitoring

https://en.wikipedia.org/wiki/Telemetry

We can apply that to software systems, too, by collecting measurements while a software system is running and keeping track of that data.

There are several reasons, but the main one is to discover what is happening inside our systems and then _optimize_ them based on our findings.

There are several ways to take measures from a running Elixir app.

For example, the following fragment would take the duration of a function execution:

```elixir
def some_function do
    start = System.monotonic_time()
    # do something that you want to measure
    stop = System.monotonic_time()
    record_measure("operation took: ", stop - start)
    # ...
end
```

- [[Elixir/System#monotonic_time]]

## Elixir [[Elixir/telemetry|telemetry]] library

-   provides a standard interface to measure and emit telemetry data
-   it is small and simple to use

How does it work? It is very simple:

-   you execute a measurement
-   you create a function that will be invoked when the measure is taken
-   you attach the function to the event measured

```elixir
defmodule Asta.Telemetry do
	def sale, do: "Telemetry"
end
```

Let's just try it with iex. In the shell, write:

```
iex(1)> Asta.Telemetry.sale
"Telemetry"
```

![[Elixir/telemetry#execute]]
![[Elixir/telemetry#event handler]]

What you need to notice here is that we **decoupled the emitting of the telemetry** data with the handling of the data collected. Our app can use [[Elixir/telemetry#execute]] everywhere with the same standard interface and, as long as we have a corresponding function to handle that event, we'll be collecting that data.

Even more important, if we don't have an event handler for that event, our emitting code will _still_ work. It won't even notice there is nothing collecting data.


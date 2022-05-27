# `telemetry`

## [[Introduction to Telemetry in Elixir]]
## [[Telemetry and Metrics in Elixir]]


## `execute()`

Add telemetry collection call:

```elixir
defmodule Asta.Telemetry do
  def sale(some) do
    #

    :telemetry.execute(
      [:some, :sale],		# event name
      %{some: some},		# measurement
	  %{meta: :none}		# metadata (optional)
    )

    "Telemetry: #{some}"
  end
end
```


Good. Now we are doing something. We are using the `execute` function of the `telemetry` module and we are passing three things:

-   **event name** as a list of keywords
-   **measurement** we are interested in (sale total in our example)
-   additional _metadata_ we might need (here I am just putting the product name)

The metadata could be anything we want: our users' IP address, some tracking header from a web request, the user id, etc.

## event handler

Finally is the event name. You can put anything here. Most people put a hierarchy of words to easily identify the events. What is important to keep in mind is that this event name will be used later to match which **handle function** for this event:

```elixir
  require Logger

  def handle_event(name, measure, meta, _config) do
    Logger.info("handle_measure(#{name}, #{measure}, #{meta})")
  end
```

It is very simple. It has a function (the name doesn't matter but the convention is to name it `handle_event`) that has as the first parameter the keyword list we are going to match against. Then the measurements and metadata. The last parameter doesn't matter right now. Just ignore it.

This function is going to be called _every_ time the `execute` function is called and the event name matches. That means that 
- this function **must avoid blocking execution** for much time as 
- it will be evaluated **synchronously**.


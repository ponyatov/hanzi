# Elixir/ Process

## [[Elixir/Observability]]

### `Process.whereis/1`

If you’re fortunate enough to know the name of the process you want to observe, you can find its PID with `Process.whereis/1`. This function takes an atom as argument and returns the PID (or `nil`) of the associated process.

As an example, a typical IEx session runs many processes, including `IEx.Pry` and `Logger`. With those names in hand, it’s a simple matter to discover their PIDs.

```elixir
iex 1> Process.whereis(Logger)
#PID<0.103.0>

iex 2> Process.whereis(IEx.Pry)
#PID<0.95.0>
```

Now that you see how easy it is to find the PID of a named process (i.e. registered name), you can understand why it’s important to give names to your GenServer processes. Without a name, where do you start looking?

### `Process.list`

If you’re not sure of the exact name of the process you’re looking for, you can get a list of all the processes running with `Process.list/0`. This function lists all running PIDs. By itself, it isn’t terribly helpful, but when paired with other functions it’s useful in tracking down processes.

Here’s an example of listing PIDs along with their registered name if available:

```elixir
iex 1> for pid <- Process.list, do: {pid, Process.info(pid, :registered_name)}
[
  {#PID<0.0.0>, {:registered_name, :init}},
  {#PID<0.1.0>, {:registered_name, :erts_code_purger}},
  {#PID<0.2.0>, {:registered_name, []}},
  {#PID<0.3.0>, {:registered_name, []}},
  {#PID<0.4.0>, {:registered_name, []}},
  {#PID<0.5.0>, {:registered_name, []}},
  {#PID<0.6.0>, {:registered_name, []}},
  {#PID<0.9.0>, {:registered_name, :erl_prim_loader}},
  {#PID<0.41.0>, {:registered_name, :logger}},
  {#PID<0.43.0>, {:registered_name, :application_controller}},
...
]
```

We’ll see a better way to organize this data later, but this is a good starting point.

### Process.info

It’s not always the case that the process you’re looking has a name or is even recognizable. In those cases, it may be that it’s linked to or monitored by another process. Knowing _that_ process’s name can help you narrow down your search.

As an example, let’s pretend one of `Logger`’s processes is causing problems for us. If we use the `for` comprehension above to find Logger related processes, we see the following:

```elixir
iex 1> for pid <- Process.list, do: {pid, Process.info(pid, :registered_name)}
[
  ...
  {#PID<0.41.0>, {:registered_name, :logger}},
  ...
  {#PID<0.68.0>, {:registered_name, :logger_sup}},
  {#PID<0.69.0>, {:registered_name, :logger_handler_watcher}},
  {#PID<0.70.0>, {:registered_name, :logger_proxy}},
  ...
  {#PID<0.99.0>, {:registered_name, []}},
  {#PID<0.100.0>, {:registered_name, Logger.Supervisor}},
  {#PID<0.101.0>, {:registered_name, Logger}},
  {#PID<0.102.0>, {:registered_name, []}},
  {#PID<0.103.0>, {:registered_name, Logger.BackendSupervisor}},
  ...
]
```

If we don’t see any problems with any of the named processes for `Logger`, we can take it a step further by looking at any processes which are linked or being monitoring. Given our understanding of the system we might guess that `Logger.Supervisor` is either linked to or monitoring the processes causing us problems.

```elixir
iex 1> pid = pid(0, 100, 0) # build Logger.Supervisor's pid
#PID<0.100.0>

iex 2> {:links, pids} = Process.info(pid, :links)
{:links, [#PID<0.101.0>, #PID<0.102.0>, #PID<0.103.0>, #PID<0.99.0>]}
```

From our earlier list of `pids`, we see that PIDs 101 and 103 have names (and so already viewed). However, we haven’t looked at the unnamed PIDs, 99 and 102. With that information in hand, we can continue our analysis.

With both the tools and the ability to find specific processes, we can now turn our attention to the investigation.

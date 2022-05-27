# Elixir [[Process]]es: Observability
## [[Erlang]]/[[Elixir]] comes with observability built in

https://samuelmullen.com/articles/elixir-processes-observability/

![[Game/Black Box#short]]

Observability in most programming languages is similar to playing [[Black Box]]. Instead of shooting rays into a grid to locate atoms, however, we are reduced to watching logs, deciphering stack traces, caveman debugging, and guesswork to try and find memory leaks, bottlenecks, and [Heisenbugs](https://en.wikipedia.org/wiki/Heisenbug). It’s tedious and frustrating work, and nowhere near as fun as playing the puzzle game.

But observability in Elixir is a vastly different experience than that of “most programming languages”, because **Erlang/Elixir comes with observability built in**. Questions such as “how much memory is a process consuming?”, “how many child processes does the parent have?”, and “what’s the internal state of a process?” are all easily answered with a few keystrokes.

## tooling

You should already know you can start and connect an IEx session to your application with `iex -S mix`. In the case of a Phoenix application, you can use `iex -S mix phx.server`. For production releases using [[Elixir/Distillery]] or [[Elixir/mix/Release|Mix Releases]] you can connect a console to the running application with 
- `bin/my_app remote_console` ([[Distillery]]) or 
- `bin/my_app remote` ([[Release|Mix Release]])

from your app’s deployment directory.


### [[PID]]/[[Erlang/ref|reference]]

When dealing with processes, you need to know the process' name, the [[PID]] (Process ID), or the reference; the last being most often used with monitored processes. You can build either a PID or a reference with `pid/1,3` or `ref/1,4` respectively. For example, if the PID you’re interested in is `#PID<0.100.0>`, but you don’t have it assigned to a variable, you can do the following in [[IEx]]:

![[PID#create]]

You can do something similar for references.

![[ref#create]]

## Finding Processes

The first step to finding any solution is knowing what the problem is. In the case of observing Elixir processes, it’s knowing which process to look at. We already know how to build a PID from scratch, now let’s see how to find PIDs for our processes.

![[Process#Process whereis 1]]
![[Process#Process list]]

### For loop over [[Process#Process list]] or get for single item:

![[Process#Process info]] 

```
iex(11)> Process.info Process.whereis Hanzi.App
```
```elixir
[
  registered_name: Hanzi.App,
  current_function: {:gen_server, :loop, 7},
  initial_call: {:proc_lib, :init_p, 5},
  status: :waiting,
  message_queue_len: 0,
  links: [#PID<0.859.0>],
  dictionary: [
    "$initial_call": {:supervisor, Supervisor.Default, 1},
    "$ancestors": [#PID<0.859.0>]
  ],
  trap_exit: true,
  error_handler: :error_handler,
  priority: :normal,
  group_leader: #PID<0.858.0>,
  total_heap_size: 233,
  heap_size: 233,
  stack_size: 12,
  reductions: 70,
  garbage_collection: [
    max_heap_size: %{error_logger: true, kill: true, size: 0},
    min_bin_vheap_size: 46422,
    min_heap_size: 233,
    fullsweep_after: 65535,
    minor_gcs: 0
  ],
  suspending: []
]
iex(12)> 
```

# [[Elixir]]/ Configuration

There are four different kinds of things that we may want to configure:

1.  Static information about application layout, e.g. file paths. This is the same for all machines in an environment, e.g. staging or prod.
    
2.  Information specific to the environment, e.g. the hostname of the db server.
    
3.  Secrets such as db passwords, API keys or TLS keys.
    
4.  Dynamic information such as the IP address of the server or other machines in the cluster.
    

Elixir has a couple of mechanisms for storing configuration. When you compile the release, it converts Elixir-format config files like `config/prod.exs` into an initial application environment (`sys.config`) that is read by [Application.get_env/3](https://hexdocs.pm/elixir/Application.html#get_env/3). That's fine for simple, relatively static apps. It's better to keep secrets separate from the release, though.

Elixir 1.9 releases support dynamic configuration at runtime. You can run the Elixir file `config/releases.exs` when it boots or use the shell script `rel/env.sh.eex` to set environment vars. With these you can theoretically do anything. In practice, however, it can be more convenient and secure to process the config outside of the app. That's where [mix_systemd](https://github.com/cogini/mix_systemd) and [mix_deploy](https://github.com/cogini/mix_deploy) come in.



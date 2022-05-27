# `asdf`
## manages multiple versions of [[Erlang]], [[Elixir]] and [[Node/js]]

(https://asdf-vm.com/)

[ASDF] manages multiple versions of [[Erlang]], [[Elixir]] and [[Node/js]]. It is a language-independent equivalent to tools like Ruby's [[Ruby/RVM]] or [[Ruby/rbenv]].

## .tool-versions

The `.tool-versions` file in the project root specifies the versions to use:

```
erlang 22.2
elixir 1.9.4
nodejs 10.15.3
```

[[ASDF]] looks at the `.tool-versions` file and automatically sets the path to point to the correct version. The build script for the project runs `asdf install` to install the matching Erlang, Elixir and Node.js versions.

See [Using ASDF with Elixir and Phoenix](https://www.cogini.com/blog/using-asdf-with-elixir-and-phoenix/) for details.

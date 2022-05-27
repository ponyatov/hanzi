# Minimal [[Elixir]] [[Web/application]] with [[plug]] and [[cowboy]]

https://kaiwern.com/posts/2018/10/14/minimal-elixir-web-application-with-plug-and-cowboy/

It is interesting to learn things from scratch. Coming from [[Ruby]] background, I was curious what is the equivalent of [[Sinatra]] in [[Elixir/Elixir]]. It’s called Plug. It is what [[Phoenix]] build on top of.

Using [[Sinatra]], we can write a quick and simple [[Web/server]] with the following code:

```ruby
require 'sinatra'
require 'json'

get '/' do
  content_type :json
  JSON({message: "Hello World"})
end
```

Now we can get this minimal [[Web/API]] in Elixir with [[plug]] and [[cowboy]].


# Creating a Simple [[HTTP]] Server in [[Elixir/Elixir]]

https://www.jungledisk.com/blog/2018/03/19/tutorial-a-simple-http-server-in-elixir/

Over the past year or so, I’ve heard more and more about a relatively new programming language called [Elixir](https://elixir-lang.org/). The site describes the language as follows:

> [[Elixir]] is a dynamic, functional language designed for building scalable and maintainable applications.

The “dynamic, functional language” piece of this description really enticed me as I’ve been wanted to dive deeper into the functional programming paradigm. In order to facilitate my learning, I set out to create a simple web service that would receive webhook requests from various external web services and take actions based on the source and content of the [[webhook]].

### Set Up the Project

First, let’s create a new directory and navigate into it:

```
$ mkdir simple_server && cd simple_server
```

The we need to setup the project. Thankfully, Elixir’s built in build tool [[mix]] will scaffold everything up for us with one simple command:
![[mix#sup]]

You should see output similar to this:

```
* creating README.md
* creating .formatter.exs
* creating .gitignore
* creating mix.exs
* creating config
* creating config/config.exs
* creating lib
* creating lib/simple_server.ex
* creating lib/simple_server/application.ex
* creating test
* creating test/test_helper.exs
* creating test/simple_server_test.exs
Your Mix project was created successfully.
```

The files/directories we’ll be focusing on in this tutorial are:

![[Elixir/Application#files]]

### Adding Dependencies

We’re going to be using several dependencies in this simple project, these dependencies will enable us to setup our [[HTTP/server]], listen on a specific port, [[parse JSON]] request bodies, and send responses to the clients that send requests to our server. Elixir uses the [[Hex]] package manager to make finding and managing external dependencies as simple as possible.

We’ll be using the following dependencies in our project: 
- [[cowboy]] is a small, fast and modern [[HTTP/server]] for [[Erlang/OTP]]. 
- [[plug]] - A specification and conveniences for composable modules between web applications 
- [[poison]] - An incredibly fast, pure Elixir [[JSON]] library

[[Elixir/Application]]
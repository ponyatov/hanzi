# logging
## The Ultimate Guide To [[Logging]] In [[Elixir]]

https://timber.io/blog/the-ultimate-guide-to-logging-in-elixir/

### Assumptions

1.  You understand a minimum of Elixir syntax and concepts
2.  You have all of the pre-requisite software installed. Pre-reqs are:
    -   [[Elixir/install]]
    -   A code editor or [[IDE]] (I'll be using [[Elixir/VSCode]])

[

## Introduction
The best way to get the most out of this tutorial is to follow along as you build the same project as us (or something equivalent).

![[lang/logging]]

Logging in Elixir, however, is **fantastic**. It's built to accomodate the million use cases for logs and events, and is built on top of the [[OTP/event structure]] that 
- not just allows you handle logging in a sane way, but also allows you to 
- have multiple simultaneous ways to handling logging

so that nothing gets lost in the shuffle! Want to have a log file, a stdout log, and send your logs along to a service like Timber.io? Great, you can do that, and even better, you can do that **without affecting your service's response times**!

[[Elixir]] provides not just a standard **logging interface that is part of the core language itself** (so no scenario where logging in [[Phoenix]] is great but logging elsewhere is tricky), but a really simple way to modify and add new logging handlers into your codebase no matter what type of Elixir project you've written!

## Using [[IO.puts]]/[[IO.inspect]]

Logging is one of your most powerful debugging tools we can work with, so we're going to start off using *the most simple implementation of logging*: using [[IO.puts]] and [[IO.inspect]].

![[IO.puts]]
![[IO.inspect]]

- The good news: 
		- this will be enough to get you some good enough logging 
			- during the development phases of 
			- building your application. 
- The bad news, however, is that 
	- this is not a great approach to a Production system and
	-  shouldn't be relied on to [[Elixir/monitoring]] your application.

## Doing It The Robust Way

There's more good news, though: Elixir can, out of the box, take advantage of Elixir's built-in [[Elixir/Logger]] module to handle logging. Even better, the default behavior is very easily extended beyond just a simple console logger! We'll start off with a base implementation of Elixir's logger and then we'll dive into extending it to be able to handle more complicated cases and functionality using Elixir's [[Elixir/Logger Backend]] system!

#### Using Logger

![[Logger]]


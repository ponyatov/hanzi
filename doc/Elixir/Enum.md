# Enum

## map

But we don't have a single string here, we have three strings within a list. But we have knowledge on our side. We have special skills that we built up in [Chapter 9](https://joyofelixir.com/9-lists), and with those special skills we know that we can call `Enum.map/2` to apply a function to multiple elements within a list. We've done exactly this back in Chapter 9:

```
iex> Enum.map(cities, &String.capitalize/1)
```

So let's take our list, adapt this code a little bit to use the pipe operator and `String.reverse/1` and reverse each string with this code:

```
iex> contents \
|> String.split("\n", trim: true) \
|> Enum.map(&String.reverse/1)
```

We're using a multi-line pipe operator chain here to accomplish what we want. Because we're in `iex`, we need to put a backslash (`\`) on the end of every line to tell Elixir to treat all these lines as one long line and one chain of operations. If we were writing code in an Elixir file, we wouldn't need to do this. `iex` is a little special in this regard. Another way we could've written the code is like this:

```
iex> contents |> String.split("\n", trim: true) |> Enum.map(&String.reverse/1)
```

But it is considered best practice to split long pipe chains up onto multiple lines when they're really long just to help with readability. Think of it as the same rule that applies when you're writing a book: you split logical breaks into separate paragraphs to make it easier for people to read here. We're applying almost that same rule to our [[Elixir]] code.

This code (in either the one-line or three-line form) will give us back a list of strings that now look like proper English:

```
["I love Elixir", "It is so easy to learn", "Great functional code"]
```

## join

All we need to do now is to put the file back into a big string, which we can do with a new-to-us function called `Enum.join/2`:

```
iex> fixed_contents = contents \
|> String.split("\n", trim: true) \
|> Enum.map(&String.reverse/1) \
|> Enum.join("\n")
"I love Elixir\nIt is so easy to learn\nGreat functional code"
```

Excellent! We've now got our file's text around the right way. We did this with a combination of quite a few functions and that is really demonstrating the repertoire of things that we know how to do with Elixir now. We have used [[File#read]] function to read this file's contents and to bring them into our Elixir code. Once we have the contents there, we can do whatever we wish with them.

## stream!

### Streaming a file

Elixir provides us at least one very clear way to read a file: `File.read/1`. We know how this works. But there is _another_ function that Elixir gives us which can also be used to read files. That function is called `File.stream!/1`.

This function works by reading a file _one line at a time_. This is useful in cases where we might be reading very large files. If we used `File.read/1` to load a large file, it might take a long time for Elixir to read it all in and it might take up a lot of our computer's resources. On the contrary, `File.stream!` can be used to read an entire file, but will read a file line-by-line.


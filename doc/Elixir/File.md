# File

https://joyofelixir.com/11-files

## read

To read this file, we'll need to open an `iex` prompt where the file is, and then we can use this code to read it:

```
iex> File.read("haiku.txt")
```

This code tells Elixir to read a file by calling the `File.read/1` function. Calling this function will give us the following output:

```
{:ok, "I evol rixilE\nnrael ot ysae os si tI\nedoc lanoitcnuf taerG\n"}
```

The best part about these tuples and atoms being returned from the `File.read/1` call is that we can use _pattern matching_ ([Chapter 6](https://joyofelixir.com/6-pattern-matching)). If we want to only proceed if our `File.read/1` function executes successfully, we can pattern match like this:

```
iex> {:ok, contents} = File.read("haiku.txt")
```

## read error

If we specified a file that wasn't present, `File.read/1` would give us a different atom in that first place:

```
iex> File.read("haiboo.txt")
{:error, :enoent}
```


## [[Elixir/String#split]]
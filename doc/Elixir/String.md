# String

## split

The difference is: this time, we've got the contents of the file in a `contents` variable. Oooh, that was sneaky! Let's get back to the task at hand: we still need to correct this haiku back to its proper form. We've now got the contents of this file and we need to reverse each line. To do that, we need some way of splitting apart the string so that we can process each line separately from each other line. To do this, we can use our old friend, `String.split/3`:

```
iex> contents |> String.split("\n", trim: true)
```

2. The 2nd argument tells to split the string on the newline characters (`\n`), and the 
3. 3rd argument tells to *remove any trailing spaces* at the end.

## reverse

ay! We've now got a list of strings here. We need each string here to be reversed. Izzy sticks her hand up and wiggles it around. "Ooh ooh ooh I know how to do this! `String.reverse/1`!", she says, monospaced font and all. Impressive. Yes, Izzy is correct! We can reverse a string by calling `String.reverse/1` as we first saw back in [Chapter 8](https://joyofelixir.com/8-strings-input-and-output). We know we can do it with a single string like this:

```
iex> "rixilE evol I" |> String.reverse
"I love Elixir
```

[[Elixir/Enum#map]]
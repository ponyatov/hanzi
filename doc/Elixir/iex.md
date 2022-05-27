# Интерактивный режим: `iex`

Вместе с языком [[Elixir]] в комплекте идет приложение интерактивной командной строки [[REPL]], которое позволяет 
- выполнять выражения языка на лету
- интегрироваться с [[IDE]]: 
	- удобно назначить сочетение клавиш, 
		- чтобы посылать выделенный в редакторе код 
			- в консоль с запущенным `iex`

Для того чтобы начать, запустите `iex`:

```sh
ponyatov@kot:~/ex$ iex
```
```
Erlang/OTP 23 [erts-11.1.8] [source] [64-bit] [smp:2:2] [ds:2:2:10] [async-threads:1]

Interactive Elixir (1.10.3) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> 
```

Попробуем написать несколько простых выражений:

```
iex(1)> 2+3
5

iex(2)> 2+3==5
true

iex(3)> String.length("The quick brown fox jumps over the lazy dog")
43
```


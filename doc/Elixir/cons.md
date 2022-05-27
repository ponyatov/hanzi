# cons = `|`

Того же результата можно добиться с использованием оператора [[Elixir/оператор#cons|cons]] — `|`. Мы будем часто его встречать в последующих уроках.

```
iex> [head | tail] = [3.14, :pie, "Apple"]
[3.14, :pie, "Apple"]
iex> head
3.14
iex> tail
[:pie, "Apple"]
```
## Логический тип ([[lang/bool]])

Elixir поддерживает два значения логического типа: `true` и `false`. 
Абсолютно все значения в языке считаются истинными кроме `false` и `nil`:

```
iex> true
true

iex> false
false
```

В отличие от [[Python]] пустые объекты не эквивалентны:

```
iex(7)> [] == true
false
iex(8)> [] == false
false
```

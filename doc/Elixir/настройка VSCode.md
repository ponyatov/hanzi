# настройка [[VSCode]]
#IDE #VSCode #Elixir 

Работа с [[Elixir]] под [[IDE]] VSCode выполняется в [[VSCode/terminal]] -- удобнее всего открыть два терминала горизонтально:
- оставить терминал операционной системы для выполнения команд (в т.ч. [[make]])
- запустить [[iex]] через команду [[make/watch]]
- на клавишу F12 назначить отправку в терминал [[System.stop]]

## [[VSCode/settings.json]]

```json
{
    "multiCommand.commands": [
        {
            "command": "multiCommand.f12",
            "sequence": [
                "workbench.action.files.saveAll",
                {"command": "workbench.action.terminal.sendSequence",
                    // "args": {"text": "\u000D clear ; make all \u000D"}}]
                    // "args": {"text": "\u000D clear ; make forth \u000D"}}]
                    // "args": {"text": "\u000D clear ; make elixir \u000D"}}]
                    "args": {"text": "\u000D System.stop \u000D"}}]
        },
    ],
```

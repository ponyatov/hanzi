# настройка [[VSCode]]

- https://thinkingelixir.com/elixir-in-vs-code/

```
/.vscode/
	extensions.json
	settings.json
```

## `extensions.json`

```
{
    "recommendations": [
        "ryuta46.multi-command",
        "stkb.rewrap",
        "tabnine.tabnine-vscode",
        "usernamehw.errorlens",
        "ms-vscode.makefile-tools",
        // "ms-vscode-remote.remote-ssh",
        // "ms-azuretools.vscode-docker",
        // erlang
        "jakebecker.elixir-ls",
    ]
}
```

## `settings.json`

```
{
    "files.exclude": {
        "**/.elixir_ls/**":true,
	},
}
```


## run selected text in [[iex]] terminal ([[REPL]])

- https://www.reddit.com/r/elixir/comments/lrx0ju/q_first_hour_with_elixir_how_to_run_in_vscode/

- `Ctrl+K,S`
- Terminal: Run Selected Text -> `Shift+Enter`

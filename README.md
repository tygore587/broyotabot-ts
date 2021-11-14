# broyotabot-ts
This is a typescript reimplementation of the discord bot i implemented in csharp

## Development
```bash
# Watches for changes and restarts bot
$ yarn dev

# Attach a debugger
$ yarn debugger
```

## Using VSCode for debugging
Add the following configuration to your `launch.json` configurations. With that you can run the code without compiling to javascript before debugging.
```json
{
    "name": "Debug app",
    "type": "node",
    "request": "launch",
    "args": [
        "src/app.ts"
    ],
    "runtimeArgs": [
        "--nolazy",
        "-r",
        "ts-node/register"
    ],
    "sourceMaps": true,
    "cwd": "${workspaceRoot}",
    "protocol": "inspector",
}
```

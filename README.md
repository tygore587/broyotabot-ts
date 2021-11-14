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
Add the following json configuration to your `launch.json`. With that you can run the code without compiling to javascript before debugging.
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
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
    ]
}
```
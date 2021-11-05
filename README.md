# Random Cute Bot

一个纯粹的 Discord 机器人, 可以使用 [斜线命令](https://discord.com/developers/docs/interactions/application-commands) 获取可爱的图片.

[Invite bot](https://discord.com/api/oauth2/authorize?client_id=905952658219733012&scope=applications.commands)

![Screenshot1](images/screenshot1.png)

![Screenshot1](images/screenshot2.png)

## How to use

1. [Creating a Bot](https://discordpy.readthedocs.io/en/stable/discord.html)
2. Register slash command

```shell
deno run --allow-net init.ts [ClientID] [Bot token]
```

3. Deploy

  | Name | Free | Deploy |
  | ---- | ---- | ---- |
  | Deno Deploy | ? ([free now](https://deno.com/deploy/docs/pricing-and-limits/)) | [![Deploy button](https://deno.com/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/GizmoOAO/random-cute-bot/main/random-cute.ts&env=DISCORD_PUBLIC_KEY) |
  | Vercel | √ | coming soon |

## Thanks

Thanks to [JetBrains](https://jb.gg/OpenSource) for the open source license(s).

[![JetBrains Logo](https://raw.githubusercontent.com/project-vrcat/VRChatConfigurationEditor/main/images/jetbrains.svg)](https://jb.gg/OpenSource)

## License

Code is distributed under [MIT](./LICENSE) license, feel free to use it in your proprietary projects as well.

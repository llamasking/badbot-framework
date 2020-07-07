# BadBot Framework

A simple Discord bot framework which I use in all my bots. It's designed to be modular and easy to use.

## Build A Bot

### Setup

Before we can get started, we need to setup your npm pakages. Simply run `npm install -i` to install all packages I use and recommend.

If you intend on adding voice functionality to the bot, additionally run `npm install @discordjs/opus sodium`.

Note: I have not tested voice in any way, shape, or form. While I see no reason for it to not work, I can not promise it will.

### Configuration

Now, copy or rename "config.example.json" to "config.json" and fill it out.

### Adding a command

To add a command, simply make a copy of "example.js" in the "modules" folder and name it the same as the command you want to create. For instance, sending "!!test" will run "test.js".

The framework passes through the full message variable to the module. Read more on the [discord.js docs](https://discord.js.org/#/docs/main/stable/class/Message).

The framework also parses the command's arguments into an array as the "args" variable. For instance, with the command "!!testing 1 2 3", the args variable will be `["1", "2", "3"]`.

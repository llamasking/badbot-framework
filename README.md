# BadBot Framework

A simple Discord bot framework which I use in all my bots. It's designed to be modular and easy to use.

## Build A Bot

### Setup

Before we can get started, we need to setup your npm pakages. Simply run `npm install -i` to install everything you'll need for a basic, text-only bot.

If you intend on adding voice functionality to the bot, additionally run `npm install @discordjs/opus sodium`.

Note: I have not tested voice in any way, shape, or form. While I see no reason for it to not work, I can not promise it will.

### Configuration

Rename .env.example to .env and fill out as specified.

### Creating a command

To add a command, simply make a copy of the `modules/example.ts` and name it the same as the command you want to create. For instance, a file named `test.ts` will be triggered by `!!test`.

You're expected to have a basic understanding of what you're doing before writing a module. Documentation is your friend.

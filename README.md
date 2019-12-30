# BadBot Framework

## About
BadBot Framework is a simple bare framework for Discord bots which I use in [BadBoi Bot](https://github.com/llamasking/BadBoi-Bot) and in [TwitblendBot for Discord](https://github.com/llamasking/TwitblendBot-Discord). It's designed to be modular and relatively easy to develop for. 

## Build A Bot

### Introduction
There should be no need to modify the bot's framework for most commands. Generally, you should be able to maintain the bot without ever once making a change to the framework itself.

### Module Setup
Before we can even get to screwing with the config settings, you need to setup your npm modules. Please refer to the [discord.js docs](https://discord.js.org/#/docs/main/stable/general/welcome). You absolutely need to install `discord.js`, though I personally also installed `erlpack` and `uws`. If you intend to use voice, you must install either `node-opus` or `opusscript`. 

Note: I have not tested voice in any way, shape, or form whatsoever. It may not work at all. I can not point in either way.

### Configuration
Before starting the bot, you must copy or rename the `config.example.json` to `config.json`. Then, you simply fill it out.

    * Activity is the game the bot is 'playing'. 

    * OwnerID should not be in quotes, though all other config options should.
    
### Write a module
A module is called by typing <Prefix><Module>. For instance, `!!help` will run the `help.js` module. You can not have `!!helpme` run the `help.js` module unless you link `helpme.js` to `help.js` or copy it. 

I highly recommend making a copy of `example.js` when beginning to write a module. You should probably fill out the comments up top to make sure anyone else reading your code knows exactly what everything does. When a module is called, the module is fed the message class and the `args` variable. 

The message class contains all data on the message, such as the message's contents, author, time, etc. You can see everything on the [discord.js docs](https://discord.js.org/#/docs/main/stable/class/Message).

The args variable is simply an array containing all the command arguments. Commands follow the format of `<Prefix><Command <Arguments>`. For instance, the command `!!testing arguments in a command` will return with `args[0]` being `"arguments"`, `args[1]` being `"in"`, `args[2]` being `"a"`, and so on. 

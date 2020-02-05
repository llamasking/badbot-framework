# BadBot Framework

A simple, bare framework for Discord bots which is used in all my bots. It's designed to be modular and relatively easy to develop for. 

## Build A Bot

### Introduction
There should be no need to modify the bot's framework for most commands. Generally, you should be able to maintain the bot without ever once making a change to the framework itself.

### Module Setup
Before we can even get to screwing with the config settings, you need to setup your npm modules. Please refer to the [discord.js docs](https://discord.js.org/#/docs/main/stable/general/welcome). You absolutely need to install `discord.js`, though I personally also installed `erlpack` and `uws`. If you intend to use voice, you must install either `node-opus` or `opusscript`. 

Note: I have not tested voice in any way, shape, or form whatsoever. It may not work at all. I can not point in either way.

### Configuration
Before starting the bot, you must copy or rename the `config.example.json` to `config.json`. Then, you simply fill it out.

    * Activity: 
      * Name: What the bot is playing, streaming, watching, or listening to. 
      * URL: The twitch.tv stream url. Remove this line if not used.
      * Type: The activity type. Rather self-explanatory.

    * OwnerID must be an integer (not be in quotes).
    
### Write a module
A module is called by typing <Prefix><Module>. For instance, `!!help` will run the `help.js` module. You can not have `!!helpme` run the `help.js` module unless you link `helpme.js` to `help.js` or copy it. 

I highly recommend making a copy of `example.js` when beginning to write a module. You should probably fill out the comments up top to make sure anyone else reading your code knows exactly what everything does. When a module is called, the module is fed the message class and the `args` variable. 

The message class contains all data on the message, such as the message's contents, author, time, etc. You can see everything on the [discord.js docs](https://discord.js.org/#/docs/main/stable/class/Message).

The args variable is simply an array containing all the command arguments. Commands follow the format of `<Prefix><Command <Arguments>`. For instance, the command `!!testing arguments in a command` will return with `args[0]` being `"arguments"`, `args[1]` being `"in"`, `args[2]` being `"a"`, and so on. 

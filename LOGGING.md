# Logging

By default, this framework logs the following with timestamps:
    1. When the bot is starting up, (16)
    2. What modules are detected and if they're activated, (23)
    3. Upon logging into the API, basic information about the bot such as name, server count, and how many users it serves, (31-36)
    4. All messages that are: (90)
        a. Not sent by a bot, 
        b. Sent in a Discord server, not a group chat or dms, 
        c. And start with the bot's command prefix (!! by default).

All logs are kept on the machine running the bot. It is up to the bot owner, you, to determine how this data is used, if at all. 
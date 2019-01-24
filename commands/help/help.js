/**
 * @file help command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (args.command) {
    let channel, command = args.command.toLowerCase();
    if (Bastion.commands.has(command) || Bastion.aliases.has(command)) {
      if (Bastion.commands.has(command)) {
        command = Bastion.commands.get(command);
      }
      else if (Bastion.aliases.has(command)) {
        command = Bastion.commands.get(Bastion.aliases.get(command).toLowerCase());
      }
      let example = [];
      if (command.help.example.length < 1) {
        example.push('-');
      }
      else {
        for (let i = 0; i < command.help.example.length; i++) {
          example.push(`\`\`\`${message.guild.prefix[0]}${command.help.example[i]}\`\`\``);
        }
      }

      if (args.dm) {
        channel = message.author;
      }
      else {
        channel = message.channel;
      }

      await channel.send({
        embed: {
          color: Bastion.colors.GOLD,
          fields: [
            {
              name: 'Command',
              value: `\`${command.help.name}\``,
              inline: true
            },
            {
              name: 'Aliases',
              value: command.config.aliases.join(', ') || '-',
              inline: true
            },
            {
              name: 'Module',
              value: command.config.module.replace('_', ' ').toTitleCase(),
              inline: true
            },
            {
              name: 'Description',
              value: Bastion.i18n.command(message.guild.language, command.help.name).description,
              inline: false
            },
            {
              name: 'BOT Permissions',
              value: `\`${command.help.botPermission || '-'}\``,
              inline: true
            },
            {
              name: 'User Permissions',
              value: `\`${command.config.ownerOnly ? 'Bot Owner' : command.config.musicMasterOnly ? 'Music Master' : command.help.userTextPermission || '-'}\``,
              inline: true
            },
            {
              name: 'Usage',
              value: `\`\`\`${message.guild.prefix[0]}${command.help.usage}\`\`\``,
              inline: false
            },
            {
              name: 'Example',
              value: example.join('\n'),
              inline: false
            }
          ],
          footer: {
            text: command.config.enabled ? '' : 'This command is temporarily disabled.'
          }
        }
      });
    }
    else {
      return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'notFound', 'command'), message.channel);
    }
  }
  else {
    await message.channel.send({
      embed: {
        color: Bastion.colors.GOLD,
        title: 'Help',
        description: `To get the list of command categories, type \`${message.guild.prefix[0]}commands\`.` +
                     `\nTo get the list of commands in a specific command category, type \`${message.guild.prefix[0]}commands <category_name>\`.` +
                     `\nTo get help about a specific command, type \`${message.guild.prefix[0]}help <command_name>\`.`,
        thumbnail: {
          url: Bastion.user.displayAvatarURL
        },
        footer: {
          text: `Server Prefix: ${message.guild.prefix.join(' ')} • Total Commands: ${Bastion.commands.size}`
        }
      }
    });
  }
};

exports.config = {
  aliases: [ 'h' ],
  enabled: true,
  argsDefinitions: [
    { name: 'command', type: String, alias: 'c', defaultOption: true },
    { name: 'dm', type: Boolean }
  ]
};

exports.help = {
  name: 'help',
  description: 'Shows help on the specified command.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'help [command_name [--dm]]',
  example: [ 'help', 'help magic8ball', 'help acrophobia --dm' ]
};

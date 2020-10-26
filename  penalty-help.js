  const Discord = require('discord.js')
exports.run = (client, message, args) => {

  message.channel.send(
    new Discord.RichEmbed()
      .setColor('RANDOM')
  .setTitle("Help | Commands")
  .addField('**.suspended @ person 10s, 10m, 10h, 10d reason**')
  .addField('**.penalty-set / reset channel**')
  .addField('**.suspended-set / reset role**')
  .addField('**.set / reset penalty-authorized**')
  .addField('**.penalty-close**')

  .addField("**Add Bot| Support Server**", "[Add Bot](https://discord.com/oauth2/authorize?client_id=770284414764580894&permissions=8&scope=bot) | [Support Server](https://discord.gg/sY7hVN)", )

  .setImage("")

  )
    }


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'penalty-help',
}
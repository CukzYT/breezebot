const Discord = require('discord.js');
const db = require('quick.db');
exports.run = function(client, message, args) {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
 db.delete(`jailkanal_${message.guild.id}`)
 db.delete(`jailrol_${message.guild.id}`)
 db.delete(`jailyetkilisi_${message.guild.id}`)
    message.channel.send("**Jail Sistemi Başarıyla Kapatıldı.**")
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'penalty-close',
  description: 'Cezalı Sistemini Kapatır',
  usage: 'penalty-close'
};
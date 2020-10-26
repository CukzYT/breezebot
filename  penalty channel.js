const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, !jail-yetkilisi ayarla/sıfırla @rol yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let rexuskanal = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args[1].join('-'))
  if (!rexuskanal) return message.channel.send(`Bir Kanal Etiketle.`)
  
  db.set(`jailkanal_${message.guild.id}`, rexuskanal.id)
  message.channel.send(`Jail Logunun Tutulacağı Kanal ${rexuskanal} Olarak Ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailkanal_${message.guild.id}`)
    message.channel.send(`Jail Logunun Tutulduğu Kanal Başarıyla Sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jail-kanal'],
 permLevel: 0
};

exports.help = {
 name: 'cezalı-kanal',
 description: 'Birisi jaile atılınca hangi kanala mesaj atılacağını ayarlarsınız.',
 usage: 'cezalı-kanal ayarla/sıfırla #kanal',
 kategori: 'Moderasyon',
 permLvl: 'Sunucuyu Yönet'
};
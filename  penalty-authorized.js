const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(` Sistemi kullanabilmek için, z!jail-yetkilisi ayarla/sıfırla @rol yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let yetkilirol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!yetkilirol) return message.channel.send( ` Bir rol etiketle.`)
  
  db.set(`jailyetkilisi_${message.guild.id}`, yetkilirol.id)
  message.channel.send( `Jail Yetkilisi ${yetkilirol} Olarak Ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailyetkilisi_${message.guild.id}`)
    message.channel.send(`Jail Yetkilisi Başarıyla Sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jail-yetkilisi'],
 permLevel: 3
};

exports.help = {
 name: 'cezalı-yetkilisi',
 description: 'Hangi role sahip kişilerin cezalıya atabileceğini ayarlarsınız.',
 usage: 'cezalı-yetkilisi ayarla/sıfırla @rol',
 kategori: 'Moderasyon',
 permLvl: 'Sunucuyu Yönet'
};
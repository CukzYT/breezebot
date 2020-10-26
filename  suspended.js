const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix;

module.exports.run = async (client, message, args) => {
let db = require('quick.db')
let botisim = message.guild.members.get(client.user.id).displayName
let data = await db.fetch(`jailrol_${message.guild.id}`)
if(!data)  return message.channel.send(`Jail rolünü bulamadım.`)
let data2 = await db.fetch(`jailyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`Jail yetkilisi rolünü bulamadım.`)
let data3 = await db.fetch(`jailkanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`Jail kanalını bulamadım.`)
let rol = message.guild.roles.get(data)
if(!rol) return message.channel.send(`Jail rolü ayarlı değil.`)
let yetkili = message.guild.roles.get(data2)
if(!yetkili) return message.channel.send(`Jail yetkilisi ayarlı değil.`)
let kanal = message.guild.channels.get(data3)
if(!kanal) return message.channel.send(`Jail log kanalı ayarlı değil.`)

  if (!message.member.roles.has(`${yetkili.id}`)) return message.channel.send(`**${ayarlar.prefix}jail** isimli komutu kullanabilmek için ${yetkili} rolüne sahip olman gerekiyor.`)
  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kişi) return message.channel.send(`Kimi Ceza Vereceksin? Etiketlemeyi unutma.`)
  if(kişi.hasPermission("MANAGE_GUILD")) return message.channel.send(`Olmaz. Bu kişiye Ceza Veremezsin.`)
  

  let zaman = args[1]
  if(!args[1]) return message.channel.send(`Ne kadar süre cezalıda duracağını belirtmelisin.\n Örnek: !cezalı @etiket süre sebep`)
  

let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
  
  const rexuswasted = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setColor(`#f3c7e1`)
  .setDescription(`Allah Kurtarsın Birader`)
  .addField(`**Hapishaneye yollanan kişi:**`, kişi, true)
  .addField(`**Yetkili:**`, `<@${message.author.id}>`, true)
  .addField(`**Sebep:**`, sebep, true)
  .addField(`**Süre:**`, zaman.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, '  Gün'), true)
  .setTimestamp()
  .setFooter(`RexusLeyn Youtube | Cezalı Sistemi`)
  .setThumbnail(message.author.avatarURL)
  
  const rexusbitti = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`Birisi tahliye oldu!`)
  .addField(`**Tahliye olan:**`, kişi, true)
  .addField(`**Yetkili:**`, `<@${message.author.id}>`, true)
  .setTimestamp()
  .setColor(`#f3c7e1`)
  .setFooter(`Ceza süresi bitti. | RexusLeyn Youtube Cezalı Sistemi`)
  .setThumbnail(message.author.avatarURL)
  
  kişi.addRole(rol.id);
    kişi.roles.forEach(r => {
kişi.removeRole(r.id)
db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    kanal.send(rexuswasted)
    message.channel.send(`${kişi} isimli kişi başarıyla hapishaneye gönderildi.`)
    setTimeout(async () =>{
    kişi.removeRole(rol.id)
    kanal.send(rexusbitti)
  }, ms(zaman));
            setTimeout(async () =>{
message.guild.roles.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.addRole(i)}
})
              }, ms(zaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['jail'],
    permLevel: 3
  };
  
exports.help = {
 name: 'cezalı',
 description: 'Bir kişiyi belirlediğiniz rol ile cezalıya yollarsınız.',
 usage: 'cezalı @üye <10s,10m,10h,10d> sebep',
 kategori: 'Moderasyon',
 permLvl: 'Bulunmuyor. (!cezalı-yetkilisi ayarla)'
};
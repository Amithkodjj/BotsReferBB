/*CMD
  command: /setChannels
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Panel

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin = Bot.getProperty("admin")
let userID = user.telegramid
let botLink = "@" + bot.name

function reply(text) {
  let replyMarkup = {
    inline_keyboard: [[{ text: "⬅️ Back", callback_data: "/adminPanel" }]]
  }

  if (request && request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: text,
      parse_mode: "html",
      reply_markup: replyMarkup
    })
  } else {
    Api.sendMessage({
      text: text,
      parse_mode: "html",
      reply_markup: replyMarkup
    })
  }
}

if (userID !== admin) {
  reply("<i>⚠️ You're not the admin of " + botLink + ".</i>")
  return
}

if (!params) {
  let helpText = "🏘️ <b>Send channel(s) username(s)</b> without @ and space between them.\n\n" +
                 "👉 <b>Example:</b> <code>/setChannels channel1 channel2</code>\n\n" +
                 "⚠️ <b>Note:</b> You can add up to 6 channels only & must make the bot admin in those channels."
  reply(helpText)
  return
}

let inputChannels = params.split(/\s+/)

if (inputChannels.length > 6) {
  reply("<i>⚠️ You can add up to 6 channels only.</i>")
  return
}

let channels = []
for (let i = 0; i < inputChannels.length; i++) {
  let ch = inputChannels[i]
  if (ch.includes("@")) {
    reply("<i>⚠️ Send channel usernames without '@'.</i>")
    return
  }
  channels.push("@" + ch)
}

Bot.setProperty("channels", channels, "json")

let successText = "<b>🏘️ Channels set to:</b>\n\n"
channels.forEach(channel => {
  successText += channel + "\n"
})

reply(successText)


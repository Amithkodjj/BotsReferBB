/*CMD
  command: /setPayoutChannel
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
  let markup = {
    inline_keyboard: [[{ text: "⬅️ Back", callback_data: "/adminPanel" }]]
  }

  if (request && request.message) {
    Api.editMessageText({
      message_id: request.message.message_id,
      text: text,
      parse_mode: "html",
      reply_markup: markup
    })
  } else {
    Api.sendMessage({
      text: text,
      parse_mode: "html",
      reply_markup: markup
    })
  }
}

// Admin check
if (userID !== admin) {
  reply("<i>⚠️ You are not authorized to set payout channel for " + botLink + ".</i>")
  return
}

// No param? Show usage
if (!params) {
  reply("📢 <b>Set Payout Channel</b>\n\n" +
        "Use the command like:\n<code>/setPayoutChannel channelname</code>\n\n" +
        "⚠️ Do NOT include @ and ensure the bot is admin in that channel.")
  return
}

// Validate input
let newChannel = params.trim()
if (newChannel.includes("@") || newChannel.includes(" ")) {
  reply("<i>⚠️ Invalid format. Please send only the channel username without '@' or spaces.</i>")
  return
}

// Save
Bot.setProperty("payoutChannel", newChannel, "string")

reply(`✅ <b>Payout channel has been updated to:</b>\n<code>${newChannel}</code>`)


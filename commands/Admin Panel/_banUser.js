/*CMD
  command: /banUser
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

// Reusable reply function
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
  reply("<i>⚠️ You are not authorized to ban users on " + botLink + ".</i>")
  return
}

// If no param or invalid
if (!params || isNaN(params.trim()) || Number(params) <= 0) {
  reply("🚫 <b>Ban User by Telegram ID</b>\n\n" +
        "Use:\n<code>/banUser 123456789</code>\n\n" +
        "⚠️ Must be a valid Telegram ID.")
  return
}

let banID = params.trim()

// Set ban property
Bot.setProperty(banID, "Ban")

// Notify admin
reply("<b>✅ User banned successfully</b>\n\n" +
      "🆔 <b>Telegram ID:</b> <code>" + banID + "</code>")

// Notify banned user
Api.sendMessage({
  chat_id: banID,
  text: "<i>🚫 You have been banned by the admin and cannot use this bot.</i>",
  parse_mode: "html"
})


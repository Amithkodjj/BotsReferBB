/*CMD
  command: /unbanUser
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

// Helper to reply inline or fallback
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

// Check if admin
if (userID !== admin) {
  reply("<i>⚠️ You are not authorized to unban users on " + botLink + ".</i>")
  return
}

// If no Telegram ID provided
if (!params || isNaN(params.trim())) {
  reply("🚫 <b>Unban User by Telegram ID</b>\n\n" +
        "Use the command like:\n<code>/unbanUser 123456789</code>\n\n" +
        "⚠️ Please provide a valid numeric Telegram ID to unban.")
  return
}

let unbanID = params.trim()

// Unban the user
Bot.setProperty(unbanID, "Unban")

// Notify admin
reply("<b>✅ User with Telegram ID:</b> <code>" + unbanID + "</code> <b>has been unbanned successfully.</b>")

// Notify user
Api.sendMessage({
  chat_id: unbanID,
  text: "<i>✔️ You have been unbanned by the admin. You can now use the bot again.</i>",
  parse_mode: "html"
})


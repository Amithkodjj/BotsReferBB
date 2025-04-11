/*CMD
  command: /chatWithUser
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

// Check admin
if (userID !== admin) {
  reply("⚠️ <i>You are not authorized to send messages as admin in " + botLink + ".</i>")
  return
}

// Check if input is provided
if (!params) {
  reply("💬 <b>Send Message to User</b>\n\n" +
        "Use:\n<code>/chatWithUser 123456789 Hello, how are you?</code>\n\n" +
        "➡️ First: Telegram user ID\n➡️ Rest: Message content")
  return
}

let split = params.trim().split(" ")
let chatID = split.shift()
let messageText = split.join(" ")

// Validate chat ID and message
if (!chatID || isNaN(chatID) || Number(chatID) <= 0 || !messageText) {
  reply("⚠️ <b>Invalid input:</b>\n\nUse: <code>/chatWithUser 123456789 Your message here</code>")
  return
}

// Send to user
Api.sendMessage({
  chat_id: chatID,
  text: "💬 <b>Message from Admin:</b>\n\n👉 <i>" + messageText + "</i>",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [[{ text: "💬 Reply to Admin", callback_data: "/support" }]]
  }
})

// Confirm to admin
reply("✅ <b>Message sent successfully!</b>\n\n" +
      "📨 <b>To User ID:</b> <code>" + chatID + "</code>\n" +
      "📝 <b>Message:</b>\n👉 <i>" + messageText + "</i>")


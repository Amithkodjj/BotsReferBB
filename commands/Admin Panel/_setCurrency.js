/*CMD
  command: /setCurrency
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
  reply("<i>⚠️ You are not authorized to set the currency for " + botLink + ".</i>")
  return
}

// No currency input
if (!params) {
  reply("💱 <b>Set Currency</b>\n\n" +
        "Use the command like:\n<code>/setCurrency USD</code>\n\n" +
        "✅ This currency code will be shown in balances, bonuses, and payouts.")
  return
}

// Save currency
let currency = params.trim()
Bot.setProperty("currency", currency, "string")

reply("<b>✅ Currency set to:</b> <code>" + currency + "</code>")


/*CMD
  command: /setMaximumWithdrawal
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

// Helper for smart reply
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
  reply("<i>⚠️ You are not authorized to set maximum withdrawal for " + botLink + ".</i>")
  return
}

// No params = show usage guide
if (!params) {
  let usage = 
    "💸 <b>Set Maximum Withdrawal Limit</b>\n\n" +
    "Use the command like this:\n<code>/setMaximumWithdrawal 100</code>\n\n" +
    "⚠️ Must be a number greater than zero.\n" +
    "This limits how much users can withdraw in one request."

  reply(usage)
  return
}

// Validate and save
let maxWithdrawal = parseFloat(params)
if (isNaN(maxWithdrawal) || maxWithdrawal <= 0) {
  reply("<i>⚠️ Please enter a valid number greater than zero.</i>")
  return
}

Bot.setProperty("maximumWithdrawal", maxWithdrawal, "string")

let currency = Bot.getProperty("currency") || "USD"
let success = 
  "✅ <b>Maximum withdrawal updated!</b>\n\n" +
  "💸 <b>Limit:</b> <code>" + maxWithdrawal + " " + currency + "</code>"

reply(success)


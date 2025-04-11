/*CMD
  command: /setMinimumWithdrawal
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

// Admin check
if (userID !== admin) {
  reply("<i>⚠️ You are not authorized to set minimum withdrawal for " + botLink + ".</i>")
  return
}

// No input? Show usage guide
if (!params) {
  let guide =
    "💸 <b>Set Minimum Withdrawal Amount</b>\n\n" +
    "Use the command like:\n<code>/setMinimumWithdrawal 1</code>\n\n" +
    "⚠️ Must be a number greater than 0.\n" +
    "This sets the lowest amount a user can withdraw."

  reply(guide)
  return
}

// Validate number
let min = parseFloat(params)
if (isNaN(min) || min <= 0) {
  reply("<i>⚠️ Please enter a valid number greater than zero.</i>")
  return
}

// Save it
Bot.setProperty("minimumWithdrawal", min, "string")

let currency = Bot.getProperty("currency") || "USD"
let success =
  "✅ <b>Minimum withdrawal updated!</b>\n\n" +
  "💸 <b>Limit:</b> <code>" + min + " " + currency + "</code>"

reply(success)


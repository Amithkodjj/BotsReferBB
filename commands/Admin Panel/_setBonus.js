/*CMD
  command: /setBonus
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

// Helper to reply cleanly
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
  reply("<i>⚠️ You are not authorized to set bonus for " + botLink + ".</i>")
  return
}

// Show usage if no input
if (!params) {
  let guide =
    "🎁 <b>Set Bonus for New Users</b>\n\n" +
    "Use the command like:\n<code>/setBonus 5</code>\n\n" +
    "⚠️ Must be a number greater than 0.\n" +
    "This value will be added to new users' balance on start."

  reply(guide)
  return
}

// Validate value
let bonus = parseFloat(params)
if (isNaN(bonus) || bonus <= 0) {
  reply("<i>⚠️ Please enter a valid number greater than zero.</i>")
  return
}

// Save bonus
Bot.setProperty("bonus", bonus, "string")

let currency = Bot.getProperty("currency") || "USD"
let success =
  "✅ <b>Bonus updated successfully!</b>\n\n" +
  "🎁 <b>New User Bonus:</b> <code>" + bonus + " " + currency + "</code>"

reply(success)


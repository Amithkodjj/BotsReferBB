/*CMD
  command: /setPerRefer
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

// Reusable reply function with Back button
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
  reply("<i>⚠️ You are not authorized to set referral value for " + botLink + ".</i>")
  return
}

// No params: show instructions
if (!params) {
  let guideText =
    "🧑‍🤝‍🧑 <b>Set Per Referral Reward</b>\n\n" +
    "Please use the command like:\n" +
    "<code>/setPerRefer 1.5</code>\n\n" +
    "⚠️ Must be a number greater than 0.\n" +
    "💰 This value will be given to users when they refer someone."

  reply(guideText)
  return
}

// Validate param as number > 0
let perRefer = parseFloat(params)

if (isNaN(perRefer) || perRefer <= 0) {
  reply("<i>⚠️ Please provide a valid number greater than zero.</i>")
  return
}

// Set per referral value
Bot.setProperty("perRefer", perRefer, "string")

let currency = Bot.getProperty("currency") || "USD"

let successText =
  "✅ <b>Per referral reward has been set!</b>\n\n" +
  "🧑‍🤝‍🧑 <b>Reward:</b> <code>" + perRefer + " " + currency + "</code>"

reply(successText)


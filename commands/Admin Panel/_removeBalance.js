/*CMD
  command: /removeBalance
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

// Admin only
if (userID !== admin) {
  reply("<i>⚠️ You are not authorized to remove balance for " + botLink + ".</i>")
  return
}

// Check input
if (!params) {
  reply("💸 <b>Remove User Balance</b>\n\n" +
        "Use the command like:\n<code>/removeBalance 123456789 10</code>\n\n" +
        "➡️ First: Telegram ID\n➡️ Second: Amount to remove")
  return
}

let [tgid, amount] = params.trim().split(/\s+/)

if (isNaN(tgid) || isNaN(amount) || tgid <= 0 || amount <= 0) {
  reply("⚠️ <b>Invalid input:</b>\nUse: <code>/removeBalance 123456789 10</code>")
  return
}

// Use ResourcesLib to modify balance
let res = Libs.ResourcesLib.anotherUserRes("balance", tgid)
let currency = Bot.getProperty("currency") || "USD"

if (res.value() < amount) {
  amount = res.value()  // Don't go below 0
}

res.add(-amount)  // Safely deduct

reply("✅ <b>Balance updated!</b>\n\n" +
      "🆔 User: <code>" + tgid + "</code>\n" +
      "➖ Removed: <code>" + amount + " " + currency + "</code>\n" +
      "💰 New Balance: <code>" + res.value().toFixed(2) + " " + currency + "</code>")

// Notify the user
Api.sendMessage({
  chat_id: tgid,
  text: "⚠️ <b>" + amount + " " + currency + "</b> has been removed from your balance by the admin.",
  parse_mode: "html"
})


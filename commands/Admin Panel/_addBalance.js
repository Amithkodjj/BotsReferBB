/*CMD
  command: /addBalance
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

// Reusable inline-friendly reply
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

// Admin validation
if (userID !== admin) {
  reply("<i>⚠️ You are not authorized to add balance for " + botLink + ".</i>")
  return
}

// Param validation
if (!params) {
  reply("💰 <b>Add Balance to User</b>\n\n" +
        "Use this format:\n<code>/addBalance 123456789 50</code>\n\n" +
        "➡️ First: User Telegram ID\n➡️ Second: Amount to add")
  return
}

let [tgid, amount] = params.trim().split(/\s+/)

if (isNaN(tgid) || isNaN(amount) || tgid <= 0 || amount <= 0) {
  reply("⚠️ <b>Please provide a valid Telegram ID and amount greater than 0.</b>\n\n" +
        "Example:\n<code>/addBalance 123456789 10</code>")
  return
}

// Add balance using Libs.ResourcesLib
let res = Libs.ResourcesLib.anotherUserRes("balance", tgid)
res.add(Number(amount))

let currency = Bot.getProperty("currency") || "USD"

reply("✅ <b>Balance added successfully!</b>\n\n" +
      "🆔 <b>User:</b> <code>" + tgid + "</code>\n" +
      "➕ <b>Amount:</b> <code>" + amount + " " + currency + "</code>\n" +
      "💰 <b>New Balance:</b> <code>" + res.value().toFixed(2) + " " + currency + "</code>")

// Notify user
Api.sendMessage({
  chat_id: tgid,
  text: "💸 <b>" + amount + " " + currency + "</b> has been added to your balance by the admin.",
  parse_mode: "html"
})


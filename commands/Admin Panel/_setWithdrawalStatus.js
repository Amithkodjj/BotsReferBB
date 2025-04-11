/*CMD
  command: /setWithdrawalStatus
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

var admin = Bot.getProperty("admin")
var userID = user.telegramid
var botLink = "@" + bot.name

if (userID !== admin) {
  Api.sendMessage({
    text: "<i>⚠️ You are not authorized to change withdrawal status for " + botLink + ".</i>",
    parse_mode: "html"
  })
  return
}

// Get current status and toggle it
let currentStatus = Bot.getProperty("withdrawalStatus") || "Off"
let newStatus = (currentStatus === "On") ? "Off" : "On"

// Save new status
Bot.setProperty("withdrawalStatus", newStatus, "string")

let resultText = "<b>🏧 Withdrawal toggled to:</b> <code>" + newStatus + "</code>"

Api.editMessageText({
  message_id: request.message.message_id,
  text: resultText,
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🤖 Back To Panel", callback_data: "/adminPanel 2" }]
    ]
  }
})


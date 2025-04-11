/*CMD
  command: 🎁 Bonus
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: /bonus
  group: 
CMD*/

let channels = Bot.getProperty("channels") || []
if (channels.length > 0 && User.getProperty("joined") !== "Yes") {
  let notJoinedText =
    "🚨 <b>Access Restricted!</b>\n\n🔔 <i>Join all our official channels to continue using the bot. Once done, tap the button below to verify and unlock full access.</i>"

  let joinKeyboard = {
    inline_keyboard: [[{ text: "✅ I’ve Joined", callback_data: "/joined" }]]
  }

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: notJoinedText,
      parse_mode: "html",
      reply_markup: joinKeyboard
    })
  } else {
    Api.sendMessage({
      text: notJoinedText,
      parse_mode: "html",
      reply_markup: joinKeyboard
    })
  }
  return
}

if (Bot.getProperty(user.telegramid) === "Ban") {
  let banText =
    "⛔ <b>You’ve been blocked from accessing this bot.</b>\n\n🛑 <i>If you think this is an error, contact support for help resolving the issue.</i>"

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: banText,
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text: banText,
      parse_mode: "html"
    })
  }
  return
}

if (Bot.getProperty("maintenanceStatus") === "On") {
  let maintenanceText =
    "🚧 <b>We’re currently updating the system!</b>\n\n⏳ <i>The bot is under maintenance. Please try again shortly and thank you for your patience!</i>"

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: maintenanceText,
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text: maintenanceText,
      parse_mode: "html"
    })
  }
  return
}

if (User.getProperty("bonusCollected") == "Yes") {
  let alreadyCollectedText =
    "⚠️ <b>Daily Bonus Already Claimed!</b>\n\n🕘 <i>You’ve already collected your bonus in the last 24 hours. Come back tomorrow to claim again.</i>"

  if (request.message) {
    Api.editMessageText({
      chat_id: request.message.chat.id,
      message_id: request.message.message_id,
      text: alreadyCollectedText,
      parse_mode: "html"
    })
  } else {
    Api.sendMessage({
      text: alreadyCollectedText,
      parse_mode: "html"
    })
  }
  Bot.run({
    command: "/mainMenu "+request.message.message_id,
    run_after: 3
  })
  return
}

let bonus = parseFloat(Bot.getProperty("bonus") || 0)
let currency = Bot.getProperty("currency") || "USD"
Libs.ResourcesLib.userRes("balance").add(bonus)
User.setProperty("bonusCollected", "Yes", "string")

let successText =
  "🎁 <b>Bonus Received!</b>\n\n💵 <code>" +
  bonus +
  " " +
  currency +
  "</code>\n\n✔️ <i>Your wallet has been credited. Keep coming back daily for more rewards!</i>"
let successKeyboard = {
  inline_keyboard: [[{ text: "🏠 Go to Menu", callback_data: "/mainMenu" }]]
}

if (request.message) {
  Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,
    text: successText,
    parse_mode: "html",
    reply_markup: successKeyboard
  })
} else {
  Api.sendMessage({
    text: successText,
    parse_mode: "html",
    reply_markup: successKeyboard
  })
}

Bot.run({
  command: "/bonus1",
  run_after: 86400
})


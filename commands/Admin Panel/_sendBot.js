/*CMD
  command: /sendBot
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

// Admin check
if (userID !== admin) {
  reply("<i>⚠️ You are not authorized to send this bot on behalf of " + botLink + ".</i>")
  return
}

// Check for emails
if (!params || !params.includes("@")) {
  reply("📩 <b>Send Bot via Email</b>\n\n" +
        "Use the command like:\n" +
        "<code>/sendBot email1@example.com,email2@example.com</code>\n\n" +
        "⚠️ Separate multiple emails with commas.\nOnly valid emails will be used.")
  return
}

// Split and clean email list
let rawEmails = params.split(",")
let successMessages = []
let invalidEmails = []

for (let i = 0; i < rawEmails.length; i++) {
  let email = rawEmails[i].trim()

  // Basic validation
  if (!email.includes("@") || !email.includes(".")) {
    invalidEmails.push(email)
    continue
  }

  // Send bot
  BBAdmin.installBot({
    email: email,
    bot_id: bot.id
  })

  successMessages.push("✅ <b>Bot sent to:</b> <code>" + email + "</code>")
}

// Response
let finalText = successMessages.join("\n")

if (invalidEmails.length > 0) {
  finalText += "\n\n⚠️ <b>Skipped invalid email(s):</b>\n" +
               "<code>" + invalidEmails.join(", ") + "</code>"
}

reply(finalText)


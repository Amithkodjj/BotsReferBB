/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: main menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (!User.getProperty("newUser")) {
  User.setProperty("newUser", "Yes", "string")

  let admin = Bot.getProperty("admin")
  if (!admin) {
    Api.sendMessage({
      text:
        "<i>⚠️ The Bot @" +
        bot.name +
        " Does Not Have An Admin\nPlease Click /adminLogin And become the only admin of bot!</i>",
      parse_mode: "html"
    })
    return
  }
  let userLink =
    "<a href='tg://user?id=" + user.telegramid + "'>" + user.first_name + "</a>"
  let status = Libs.ResourcesLib.anotherChatRes("status", "global")
  status.add(1)

  let adminText =
    "<b>🎉 New User Alert!</b>\n\n" +
    "👤 <b>Name:</b> " +
    user.first_name +
    "\n🔗 <b>Username:</b> @" +
    (user.username || "No Username") +
    "\n🔗 <b>Profile:</b> " +
    userLink +
    "\n🆔 <b>ID:</b> <code>" +
    user.telegramid +
    "</code>\n\n" +
    "📊 <b>Total Users:</b> <code>" +
    status.value() +
    "</code>"

  Api.sendMessage({
    chat_id: admin,
    text: adminText,
    parse_mode: "html"
  })
}

// 2. REFERRAL TRACKING
function doTouchOwnLink() {
  Api.sendMessage({
    text: "<i>⚠️ You can't invite yourself!</i>",
    parse_mode: "html"
  })
}

function doAttracted(refUser) {
  Api.sendMessage({
    text:
      "<b>🎊 You joined using an invite from <a href='tg://user?id=" +
      refUser.telegramid +
      "'>" +
      refUser.first_name +
      "</a></b>",
    parse_mode: "html"
  })

  Api.sendMessage({
    chat_id: refUser.telegramid,
    text:
      "<b>🚀 A new user joined through your invite link: <a href='tg://user?id=" +
      user.telegramid +
      "'>" +
      user.first_name +
      "</a></b>",
    parse_mode: "html"
  })
}

function doAlreadyAttracted() {
  Api.sendMessage({
    text: "<i>⚠️ You've already started using @" + bot.name + "!</i>",
    parse_mode: "html"
  })
}

Libs.ReferralLib.track({
  onTouchOwnLink: doTouchOwnLink,
  onAttracted: doAttracted,
  onAlreadyAttracted: doAlreadyAttracted
})

// 3. CHANNEL MEMBERSHIP CHECK
if (User.getProperty("joined") === "Yes") {
  Bot.runCommand("/mainMenu")
} else {
  // Show UI with list of channels and Join button
  let channels = Bot.getProperty("channels")

  if (!channels || channels.length === 0) {
    // No channels set, allow entry
    User.setProperty("joined", "Yes", "string")
    Bot.runCommand("/mainMenu")
    return
  }

  let msg = "📢 *To use this bot, please join the following channels:*\n\n"
  let btns = []

  for (let i = 0; i < channels.length; i++) {
    let ch = channels[i]
    msg += i + 1 + ". [@" + ch + "](https://t.me/" + ch + ")\n"
    btns.push([{ text: "Join @" + ch, url: "https://t.me/" + ch }])
  }

  btns.push([{ text: "✅ I've Joined", callback_data: "/joined" }])

  Api.sendMessage({
    text: msg,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: btns }
  })
}


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
        "<i>⚠️ This bot <b>@" + bot.name + "</b> doesn't have an admin yet.\n\n" +
        "Become the <b>owner</b> now — click /adminLogin to claim it!</i>",
      parse_mode: "html"
    })
    return
  }

  let userLink =
    "<a href='tg://user?id=" + user.telegramid + "'>" + user.first_name + "</a>"
  let status = Libs.ResourcesLib.anotherChatRes("status", "global")
  status.add(1)

  let adminText =
    "👥 <b>New User Joined!</b>\n\n" +
    "👤 <b>Name:</b> " + user.first_name +
    "\n🔖 <b>Username:</b> @" + (user.username || "No Username") +
    "\n🔗 <b>Profile:</b> " + userLink +
    "\n🆔 <b>User ID:</b> <code>" + user.telegramid + "</code>\n\n" +
    "📊 <b>Total Users:</b> <code>" + status.value() + "</code>"

  Api.sendMessage({
    chat_id: admin,
    text: adminText,
    parse_mode: "html"
  })
}

// 2. REFERRAL TRACKING
function doTouchOwnLink() {
  Api.sendMessage({
    text: "<i>🚫 You can't use your own invite link!</i>",
    parse_mode: "html"
  })
}

function doAttracted(refUser) {
  Api.sendMessage({
    text:
      "🎉 <b>You joined using an invite from</b> <a href='tg://user?id=" +
      refUser.telegramid +
      "'>" +
      refUser.first_name +
      "</a>!",
    parse_mode: "html"
  })

  Api.sendMessage({
    chat_id: refUser.telegramid,
    text:
      "🔔 <b>Someone just joined through your invite!</b>\n\n" +
      "👤 <a href='tg://user?id=" + user.telegramid + "'>" + user.first_name + "</a>",
    parse_mode: "html"
  })
}

function doAlreadyAttracted() {
  Api.sendMessage({
    text: "<i>ℹ️ You’ve already started using <b>@" + bot.name + "</b>!</i>",
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
  let channels = Bot.getProperty("channels")

  if (!channels || channels.length === 0) {
    User.setProperty("joined", "Yes", "string")
    Bot.runCommand("/mainMenu")
    return
  }

  let msg = "📢 *Before using this bot, please join the required channels below:*\n\n"
  let btns = []

  for (let i = 0; i < channels.length; i++) {
    let ch = channels[i].replace("@", "")
    msg += "🔹 [" + channels[i] + "](https://t.me/" + ch + ")\n"
    btns.push([{ text: "🔗 Join " + channels[i], url: "https://t.me/" + ch }])
  }

  btns.push([{ text: "✅ I’ve Joined", callback_data: "/joined" }])

  Api.sendMessage({
    text: msg,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: { inline_keyboard: btns }
  })
}


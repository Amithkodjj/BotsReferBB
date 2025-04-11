/*CMD
  command: /joined
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

let rawChannels = Bot.getProperty("channels");

if (!rawChannels || rawChannels.length === 0) {
  User.setProperty("joined", "Yes", "string");
  return Bot.runCommand("/mainMenu");
}

// Add "@" back to channel usernames
let channels = rawChannels

// Build final API URL
let url = "https://membership.bjcoderx.workers.dev/?bot_token=" + bot.token + "&user_id=" + user.telegramid + "&chat_id=" + encodeURIComponent(JSON.stringify(channels))

HTTP.post({
  url: url,
  success: "/check"
});


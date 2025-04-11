/*CMD
  command: /gameToggle
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

let admin = Bot.getProperty("admin");
if (user.telegramid !== admin) return;

let game = params.toLowerCase();
let current = Bot.getProperty(game.charAt(0).toUpperCase() + game.slice(1));

let newStatus = current === "on" ? "off" : "on";
Bot.setProperty(game.charAt(0).toUpperCase() + game.slice(1), newStatus, "string");

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: `${game.charAt(0).toUpperCase() + game.slice(1)} is now ${newStatus.toUpperCase()}`,
  show_alert: true
});

Bot.runCommand("/adminPanel 2");


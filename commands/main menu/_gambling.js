/*CMD
  command: /gambling
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

if (request) {
  let text =
    "<b>🎰 Welcome to the Gambling Zone!</b>\n\n" +
    "Choose the game below to test your luck and earn big. game require at least <b>5 balance</b> to play.\n\n" +
    "Good luck!"

  Api.editMessageText({
    message_id: request.message.message_id,
    text: text,
    parse_mode: "html",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🎲 Prediction Dice", callback_data: "/prediction" }],
        [{ text: "⬅️ Back", callback_data: "/mainMenu" }]
      ]
    }
  })
}


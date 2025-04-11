/*CMD
  command: /pred_pick
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Prediction Game

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let choice = params
User.setProperty("pred_choice", choice, "string")
let amount = User.getProperty("pred_amount")

Api.editMessageText({
  message_id: request.message.message_id,
  text:
    "<b>🎲 Prediction Dice</b>\n\n" +
    "Bet: <code>" + amount + "</code>\n" +
    "Prediction: <b>" + (choice === "low" ? "LOW ✅" : "HIGH ✅") + "</b>\n" +
    "Payout: <b>1.90x</b>\n\nTap confirm to roll the dice!",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🎲 Confirm", callback_data: "/pred_play" }],
      [{ text: "⬅️ Change Side", callback_data: "/pred_choose" }]
    ]
  }
})


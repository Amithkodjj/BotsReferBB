/*CMD
  command: /pred_choose
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

let amount = User.getProperty("pred_amount")

Api.editMessageText({
  message_id: request.message.message_id,
  text:
    "<b>🎲 Prediction Dice</b>\n\n" +
    "Bet: <code>" + amount + "</code>\n" +
    "Payout: <b>1.90x</b>\n\nChoose your prediction:",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🎯 LOW (1–3)", callback_data: "/pred_pick low" }, { text: "🎯 HIGH (4–6)", callback_data: "/pred_pick high" }],
      [{ text: "⬅️ Change Bet", callback_data: "/prediction" }]
    ]
  }
})


/*CMD
  command: /prediction
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

if (Bot.getProperty("Prediction") !== "on") {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "🛠️ Prediction is under maintenance.",
    show_alert: true
  })
}

let rawAmt = User.getProperty("pred_amount_input") || ""
let amt = rawAmt.replace(/^0+(?!$)/, "") || "0"
User.setProperty("pred_amount_input", amt, "string")

if (!amt) {
  amt = "0"
  User.setProperty("pred_amount_input", amt, "string")
}

Api.editMessageText({
  message_id: request.message.message_id,
  text:
    "<b>🎲 Prediction Dice</b>\n\n" +
    "• Predict if dice is <b>LOW (1–3)</b> or <b>HIGH (4–6)</b>\n" +
    "• Bet Range: <code>5 - 10</code>\n" +
    "• Payout: <b>1.90x</b>\n\n" +
    "Your Bet: <code>" + amt + "</code>",
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: "1", callback_data: "/pred_digit 1" }, { text: "2", callback_data: "/pred_digit 2" }, { text: "3", callback_data: "/pred_digit 3" }],
      [{ text: "4", callback_data: "/pred_digit 4" }, { text: "5", callback_data: "/pred_digit 5" }, { text: "6", callback_data: "/pred_digit 6" }],
      [{ text: "7", callback_data: "/pred_digit 7" }, { text: "8", callback_data: "/pred_digit 8" }, { text: "9", callback_data: "/pred_digit 9" }],
      [{ text: "⬅️", callback_data: "/pred_back" }, { text: "0", callback_data: "/pred_digit 0" }, { text: "✅ Confirm", callback_data: "/pred_check" }],
      [{ text: "📜 History", callback_data: "/pred_history 1" }, { text: "⬅️ Back", callback_data: "/gambling" }]
    ]
  }
})


/*CMD
  command: /pred_check
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

let amount = parseFloat(User.getProperty("pred_amount_input") || "0")
let balance = Libs.ResourcesLib.userRes("balance")

if (amount < 5 || amount > 10 || balance.value() < amount) {
  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "❌ Invalid or insufficient balance.",
    show_alert: true
  })
}

User.setProperty("pred_amount", amount, "float")
Bot.runCommand("/pred_choose")


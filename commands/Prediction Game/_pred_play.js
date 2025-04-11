/*CMD
  command: /pred_play
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

if(request.data){
Api.deleteMessage({
message_id : request.message.message_id
})
}
let amount = User.getProperty("pred_amount")
let choice = User.getProperty("pred_choice")
let balance = Libs.ResourcesLib.userRes("balance")

if (balance.value() < amount) {
  return Bot.sendMessage("❌ Insufficient balance.")
}

// remove balance now
balance.remove(amount)

User.setProperty("pred_temp", {
  amount: amount,
  choice: choice
}, "json")

Api.sendDice({
  emoji: "🎲",
  on_result: "/pred_result"
})


/*CMD
  command: /pred_back
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

let val = User.getProperty("pred_amount_input") || ""
User.setProperty("pred_amount_input", val.slice(0, -1), "string")
Bot.runCommand("/prediction")


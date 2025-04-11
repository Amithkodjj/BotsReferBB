/*CMD
  command: /pred_digit
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

let digit = params
let val = (User.getProperty("pred_amount_input") || "") + digit
if (val.length <= 2) User.setProperty("pred_amount_input", val, "string")
Bot.runCommand("/prediction")


/*CMD
  command: /pred_result
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

if (!options.roll) {
  // Step 1: Handle initial dice result from on_result
  let roll = options.result.dice.value
  let data = User.getProperty("pred_temp") || {}

  // Schedule the final message after 2s
  Bot.run({
    command: "/pred_result",
    run_after: 2,
    options: {
      roll: roll,
      data: data
    }
  })
  return
}

// Step 2: After 2 seconds, handle final result output
let roll = options.roll
let data = options.data || {}

let amount = parseFloat(data.amount || 0)
let choice = data.choice || "unknown"
let win = (choice === "low" && roll <= 3) || (choice === "high" && roll >= 4)

let balance = Libs.ResourcesLib.userRes("balance")

let msg =
  "<b>🎲 Prediction Dice</b>\n\n" +
  "Prediction: <b>" + (choice === "low" ? "LOW" : choice === "high" ? "HIGH" : "UNKNOWN") + "</b>\n" +
  "Dice Result: <code>" + roll + "</code>\n\n"

if (win) {
  let winAmt = (amount * 1.9).toFixed(2)
  balance.add(parseFloat(winAmt))
  msg += "🎉 <b>You Won:</b> +<code>" + winAmt + "</code>"
} else {
  msg += "❌ <b>You Lost!</b>"
}

// Save history
let history = User.getProperty("pred_history") || []
history.unshift({
  roll: roll,
  bet: amount.toFixed(2),
  side: choice,
  result: win
})
if (history.length > 50) history.pop()
User.setProperty("pred_history", history, "json")

Api.sendMessage({
  text: msg,
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔁 Play Again", callback_data: "/prediction" }],
      [{ text: "📜 History", callback_data: "/pred_history 1" }],
      [{ text: "🏠 Menu", callback_data: "/mainMenu" }]
    ]
  }
})


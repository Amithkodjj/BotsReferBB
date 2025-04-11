/*CMD
  command: /pred_history
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

let page = parseInt(params || "1")
let history = User.getProperty("pred_history") || []

if (history.length === 0) {
  return Api.editMessageText({
    message_id: request.message.message_id,
    text: "📜 <b>No prediction history yet.</b>",
    parse_mode: "html",
    reply_markup: { inline_keyboard: [[{ text: "⬅️ Back", callback_data: "/prediction" }]] }
  })
}

let perPage = 5
let start = (page - 1) * perPage
let totalPages = Math.ceil(history.length / perPage)
let items = history.slice(start, start + perPage)

let text = "<b>📜 Prediction History (Page " + page + ")</b>\n\n"
items.forEach((h, i) => {
  text +=
    "🎲 <b>#" + (start + i + 1) + "</b>\n" +
    "• Bet: <code>" + h.bet + "</code>\n" +
    "• Side: <b>" + h.side + "</b>\n" +
    "• Roll: <code>" + h.roll + "</code>\n" +
    "• Result: " + (h.result ? "✅ Win" : "❌ Lose") + "\n" +
    "──────────────\n"
})

let nav = []
if (page > 1) nav.push({ text: "⬅️ Prev", callback_data: "/pred_history " + (page - 1) })
if (page < totalPages) nav.push({ text: "➡️ Next", callback_data: "/pred_history " + (page + 1) })

let pageButtons = []
for (let i = 1; i <= totalPages && i <= 5; i++) {
  pageButtons.push({
    text: i === page ? "• " + i + " •" : "" + i,
    callback_data: "/pred_history " + i
  })
}

Api.editMessageText({
  message_id: request.message.message_id,
  text: text,
  parse_mode: "html",
  reply_markup: {
    inline_keyboard: [
      nav,
      pageButtons,
      [{ text: "⬅️ Back", callback_data: "/prediction" }]
    ]
  }
})


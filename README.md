<div align="center">

# 🏆 **BBReferContestBot** 🏆  
**Engage. Refer. Win. Gamble. Repeat!**  
_A smart Telegram bot for referral, balances, and next-gen community growth._

</div>

---

## ✨ **About BBReferContestBot**

**BBReferContestBot** is a feature-packed, fully automated Telegram bot designed to make referral contests fun, competitive, and super effective. Whether you're running giveaways or building a group, this bot helps you track, manage, and reward referrals with advanced tools—including a **built-in gambling system**, **admin control panel**, and **next-level withdrawal methods**.

> **Gamify your growth and engage your users like never before!**

---

## ⚙️ **Features at a Glance**

| **Feature**                  | **Description**                                                                 |
|------------------------------|---------------------------------------------------------------------------------|
| **🔗 Referral Tracking**      | Generates unique links and tracks every successful invite in real-time.        |
| **📊 Live Leaderboard**       | Displays top referrers and updates automatically.                              |
| **🎰 Referral Gambling**      | Users can gamble their referral balance for a chance to win more!              |
| **🧠 Admin Panel**            | Full-featured admin tools to manage, enable/disable systems, and view stats.   |
| **🧾 Gambling History**       | Transparent logs of all user gambling activities.                              |
| **🏦 Withdrawal System**      | Advanced withdrawal system using new technologies like Paytm/UPI/Wallets.      |
| **⏹️ Toggle Everything**      | Admin can enable or disable gambling, withdrawals, posting, etc., anytime.     |
| **📈 Anti-Cheat System**      | Protects the contest from fake/duplicate invites.                              |
| **⏱️ Good Broadcast**         | Bot With Good Way Of Broadcasting Fast As Possible Through Bots.business       |

---

## 📸 **Screenshots**

<div align="center">

| **Main menu** | **Withdrawal System** |
|----------------|-----------------------------|
| ![Main Menu](https://i.ibb.co/ZRs679zG/Screenshot-20250411-162127-cropped.png) | ![Withdraw System](https://i.ibb.co/nqL1Kx0C/Screenshot-20250411-162331-cropped.png) |

| **History** | **Gambling** |
|-----------------|--------------------|
| ![History](https://i.ibb.co/RkKfh2mh/Screenshot-20250411-163018-cropped.png) | ![Gambling](https://i.ibb.co/rKwNQp5j/Screenshot-20250411-162747-cropped.png) |

| **Admin Panel** | **Admin Panel Part 2** |
|------------------|------------------------|
| ![Admin Panel](https://i.ibb.co/S70FGGG2/Screenshot-20250411-162145-cropped.png) | ![Admin Part 2](https://i.ibb.co/nqhpYcYH/Screenshot-20250411-162206-cropped.png) |

</div>

---

## 🚀 **How to Deploy**

1. Visit [bots.business](https://bots.business)
2. Create a new bot and import this repo.
3. Set your admin ID and configure rewards, rules, and toggles.
4. Start the bot and invite users to compete and refer!

> No programming needed – simple, fast, powerful.

---

## 🛠️ **Admin Panel Powers**

- Toggle **Gambling**, **Withdrawals**, **Leaderboard**, or **Auto Posts** anytime.
- View **total referrals**, **pending requests**, and **gambling stats**.
- Manually reward users or broadcast updates.
- Track complete **gambling & withdrawal history**.

---

## ⚡ **Gambling System (Optional)**

> A fun way for users to multiply their referral balance!

- Gamble with coins earned from referrals.
- Win multipliers of 1.92x based on luck or risk level.
- Every play is logged and visible in history.
- Admin can disable gambling at any time with one click.

---

## 💸 **Withdrawals Made Easy**

- Users can request withdrawals with their balance.
- Supports **UPI**, **Paytm**, **Crypto**, and more!
- Withdrawal requests are sent to admin with full logs.
- Admin can approve/decline from the panel.

---

## 🤝 **Contribute & Improve**

<div align="center" style="border: 2px solid #89f7fe; padding: 20px; border-radius: 12px; background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);">

### We welcome contributions!
- Found a bug or want a new feature?
- Submit an issue or open a pull request!

> Every bit of feedback helps us grow.

</div>

---

## ❤️ **Made with Love by [Amithkodjj](https://github.com/Amithkodjj)**
## EXTERNAL API MEMBERSHIP VERIFICATION
```Javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Required parameters
  const botToken = url.searchParams.get("bot_token");
  const userId = url.searchParams.get("user_id");
  const chatId = url.searchParams.get("chat_id");

  // Validate parameters
  if (!botToken || !userId || !chatId) {
    return new Response(
      JSON.stringify({
        status: "false",
        error: "Missing parameters: bot_token, user_id, or chat_id.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  let channels;
  try {
    channels = JSON.parse(chatId);
    if (!Array.isArray(channels)) {
      throw new Error("Invalid format");
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: "false",
        error: "Invalid JSON format for chat_id. It must be a valid JSON array.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  async function isBotAdmin(botToken, chatId) {
    const botId = botToken.split(":")[0];
    const apiUrl = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${chatId}&user_id=${botId}`;
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (result && result.result && result.result.status) {
        return result.result.status === "administrator" || result.result.status === "creator";
      }
      return false;
    } catch {
      return false;
    }
  }

  async function isUserJoinedChannel(botToken, chatId, userId) {
    const apiUrl = `https://api.telegram.org/bot${botToken}/getChatMember?chat_id=${chatId}&user_id=${userId}`;
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (result && result.result && result.result.status) {
        const status = result.result.status;
        return ["member", "administrator", "creator"].includes(status);
      }
      return false;
    } catch {
      return false;
    }
  }

  let isAdmin = true;
  let isJoined = true;

  for (const channelId of channels) {
    if (!(await isBotAdmin(botToken, channelId))) {
      isAdmin = false;
      break;
    }
    if (!(await isUserJoinedChannel(botToken, channelId, userId))) {
      isJoined = false;
      break;
    }
  }

  if (!isAdmin) {
    return new Response(
      JSON.stringify({
        status: "false",
        is_joined: false,
        error_message: "Please make the bot an admin on all your channels.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  if (!isJoined) {
    return new Response(
      JSON.stringify({
        status: "true",
        is_joined: false,
        error_message: "⚠️ You need to join all channels to use this bot.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({
      status: "true",
      is_joined: true,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
```
<div align="center">

Built to help creators, marketers, and communities thrive.  
**Thank you for checking out BBReferContestBot. Let’s build something legendary!**

</div>

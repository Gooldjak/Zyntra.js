# Zyntra.js

Official library for the **Zyntra** platform. It allows to build bots for the Zyntra platform.

## 📦 Installation

```bash
npm install zyntra.js
```
## 🚀 Quick Start

```js
import { Client } from "zyntra.js";

const token = "your_bot_token";
const id = 123456; // Your bot ID

const client = new Client(token, id);

client.on("messageCreate", (action) => {
    console.log("📥 New message:", action);
});

client.on("messageEmbed", (action) => {
    console.log("🌈 New embed:", action);
});

client.on("messageDelete", (action) => {
    console.log("🗑️ Deleted message ID:", action);
});

client.sendMessage(channelId, "Hello from Zyntra.js!");

client.sendMessageEmbed(
    channelId,
    "This is fallback content.",
    "Embed Title",
    "Description of the embed",
    "#ff00ff"
);

client.getMessage(channelId, messageId);
console.log("📨 Fetched message:", fetched);

client.deleteMessage(channelId, messageId);

(async () => {
    client.connect(); // Start bot
})();
```

## 🧠 Supported Events
You can listen to the following events using client.on():

messageCreate – a new message was sent

messageEmbed – an embed was sent

messageDelete – a message was deleted

messageFetch – a message was fetched

messageBulk – multiple messages from WebSocket

## 💬 Sending a Message
```js
client.sendMessage(channelId, "Your message content");
```

## 🌈 Sending an Embed
```js
client.sendMessageEmbed(
  channelId,
  "Message",     
  "Embed Title",
  "Embed Description",
  "#ffaa00",           // HEX color
  "Image uri/url",
  "Thumbnail uri/url",
  "Footer"
);
```

## 🗑️ Deleting a Message
```js
client.deleteMessage(channelId, messageId);
```

Zyntra.js is a minimalistic yet powerful way to build bots for the Zyntra platform.
New features and improvements are coming regularly.

Made with ❤️ by the Zyntra Dev Team

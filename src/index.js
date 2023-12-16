require("dotenv").config();
const efetch = require("./func/fetch.js");
const head = {
  authorization: `Bot ${process.env.token}`,
  "Content-Type": "application/json"
};
const url = "https://discord.com/api/v10";
const WebSocket = require("ws");
const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
const register = require("./func/register.js")
const payload = {
  op: 2,
  d: {
    token: process.env.token,
    intents: 33283,
    properties: {
        os: "linux",
        $browser: "chrome",
        $device: "chrome",
    },
  },
};

ws.on("open", async () => {
  ws.send(JSON.stringify(payload));
  console.log("balls")
});

ws.on("message", async (data) => {
  const res = JSON.parse(data);
  const { t, event, op, d } = res;
//console.log(res);
  switch (op) {
    case 10:
      heartbeatInterval = d.heartbeat_interval;
      interval = heartbeat(heartbeatInterval);
      break;
    case 0:
      switch (t) {
        case "READY":
          register(res.d.user.id, head);
          console.log(`hi ${res.d.user.username}`);
          break;
        case "MESSAGE_CREATE":
          const message = res.d;
          //const a = await efetch(`${url}/channels/${message.channel_id}/messages`, head, "POST", {content: "gay sex"});
          //console.log(a)
          break;
        case "INTERACTION_CREATE":
          const interaction = res.d;
          console.log(interaction)
          if(interaction.data.name === "generate") {
            console.log("hey girly")
            setInterval(async () => {
              const a = await efetch(`${url}/interactions/${interaction.data.id}/${interaction.token}/callback`, head, "POST", {type: 4, data: {content: "Hey girly"}});
              console.log(a);
            }, 3000);

          }
      }
  }



});

const heartbeat = (ms) => {
  return setInterval(() => {
    ws.send(JSON.stringify({ op: 1, d: null }));
  }, ms);
};

ws.on("close", (a) => {
console.log(a)
});

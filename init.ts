import { cutes } from "./cutes.ts";

const clientID = Deno.args[0];
const botToken = Deno.args[1];

if (!clientID || !botToken) {
  console.log("fail");
  Deno.exit(1);
}
cutes.forEach((cute) => {
  fetch(`https://discord.com/api/v8/applications/${clientID}/commands`, {
    method: "POST",
    body: JSON.stringify({
      name: cute.command,
      description: `Get some ${cute.name}`,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${botToken}`,
    },
  });
});

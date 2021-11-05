const clientID = Deno.args[0];
const botToken = Deno.args[1];

if (!clientID || !botToken) {
  console.log("fail");
  Deno.exit(1);
}
const commands = ["cat", "dog", "fox"];
commands.forEach((command) => {
  fetch(`https://discord.com/api/v8/applications/${clientID}/commands`, {
    method: "POST",
    body: JSON.stringify({
      "name": command,
      "description": `Get some ${command}`,
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bot ${botToken}`,
    },
  });
});

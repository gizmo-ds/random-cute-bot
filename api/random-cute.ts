import { ServerRequest } from "https://deno.land/std@0.100.0/http/server.ts";
import { readAll } from "https://deno.land/std@0.113.0/streams/conversion.ts";
import { cuteData, DiscordRequest, verifySignature } from "../discord.ts";
import { cutes } from "../cutes.ts";

export default async (request: ServerRequest) => {
  if (request.method === "GET") {
    const headers = new Headers();
    headers.set("location", "https://github.com/GizmoOAO/random-cute-bot");
    return request.respond({
      headers: headers,
      status: 302,
    });
  }
  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const bodyStr = new TextDecoder().decode(await readAll(request.body));

  const valid = verifySignature(signature, timestamp, bodyStr);
  if (!valid) {
    return json(request, { error: "Invalid request" }, 401);
  }

  const req: DiscordRequest = JSON.parse(bodyStr);

  if (req.type === 1) {
    return json(request, { type: 1 });
  }

  if (req.type === 2) {
    const cute = cutes.find((cute) => cute.command === req.data.name);
    if (!cute) return json(request, { error: "command not found" }, 500);
    const img = await cute.func();
    return json(request, cuteData(cute.name, cute.provider, img));
  }

  return json(request, { error: "bad request" }, 400);
};

function json(request: ServerRequest, body: any, status = 200) {
  const headers = new Headers();
  headers.set("content-type", "application/json");
  return request.respond({
    status: status,
    body: JSON.stringify(body),
    headers: headers,
  });
}

import { ServerRequest } from "https://deno.land/std@0.100.0/http/server.ts";
import { readAll } from "https://deno.land/std@0.113.0/streams/conversion.ts";
import { cuteData, DiscordRequest, verifySignature } from "../discord.ts";
import { findCuteCat, findCuteDog, findCuteFox } from "../cutes.ts";

export default async (request: ServerRequest) => {
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
    switch (req.data.name) {
      case "cat":
        try {
          const cute = await findCuteCat();
          return json(request, cuteData("Cat", "random.cat", cute));
        } catch (error) {
          return json(request, { error: error }, 500);
        }

      case "dog":
        try {
          const cute = await findCuteDog();
          return json(request, cuteData("Dog", "dog.ceo", cute));
        } catch (error) {
          return json(request, { error: error }, 500);
        }

      case "fox":
        try {
          const cute = await findCuteFox();
          return json(request, cuteData("Fox", "randomfox.ca", cute));
        } catch (error) {
          return json(request, { error: error }, 500);
        }

      default:
        return json(request, { error: "bad request" }, 400);
    }
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

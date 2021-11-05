import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.4.0/mod.ts";
import { cuteData, DiscordRequest, verifySignature } from "./discord.ts";
import { findCuteCat, findCuteDog, findCuteFox } from "./cutes.ts";

serve({ "/": home });

async function home(request: Request) {
  const { error } = await validateRequest(request, {
    POST: { headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"] },
  });
  if (error) return json({ error: error.message }, { status: error.status });

  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();

  const valid = verifySignature(signature, timestamp, body);
  if (!valid) {
    return json(
      { error: "Invalid request" },
      { status: 401 },
    );
  }

  const req: DiscordRequest = JSON.parse(body);

  if (req.type === 1) return json({ type: 1 });

  if (req.type === 2) {
    switch (req.data.name) {
      case "cat":
        try {
          const cute = await findCuteCat();
          return json(cuteData("Cat", "random.cat", cute));
        } catch (error) {
          return json({ error: error }, { status: 500 });
        }

      case "dog":
        try {
          const cute = await findCuteDog();
          return json(cuteData("Dog", "dog.ceo", cute));
        } catch (error) {
          return json({ error: error }, { status: 500 });
        }

      case "fox":
        try {
          const cute = await findCuteFox();
          return json(cuteData("Fox", "randomfox.ca", cute));
        } catch (error) {
          return json({ error: error }, { status: 500 });
        }

      default:
        return json({ error: "bad request" }, { status: 400 });
    }
  }

  return json({ error: "bad request" }, { status: 400 });
}

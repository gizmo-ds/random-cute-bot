import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import { cuteData, DiscordRequest, verifySignature } from "./discord.ts";
import { cutes } from "./cutes.ts";

serve({ "/": home });

async function home(request: Request) {
  if (request.method === "GET") {
    return new Response(null, {
      headers: {
        location: "https://github.com/GizmoOAO/random-cute-bot",
      },
      status: 302,
    });
  }
  const { error } = await validateRequest(request, {
    POST: { headers: ["X-Signature-Ed25519", "X-Signature-Timestamp"] },
  });
  if (error) return json({ error: error.message }, { status: error.status });

  const signature = request.headers.get("X-Signature-Ed25519")!;
  const timestamp = request.headers.get("X-Signature-Timestamp")!;
  const body = await request.text();

  const valid = verifySignature(signature, timestamp, body);
  if (!valid) {
    return json({ error: "Invalid request" }, { status: 401 });
  }

  const req: DiscordRequest = JSON.parse(body);

  if (req.type === 1) return json({ type: 1 });

  if (req.type === 2) {
    const cute = cutes.find((cute) => cute.command === req.data.name);
    if (!cute) return json({ error: "command not found" }, { status: 500 });
    const img = await cute.func();
    return json(cuteData(cute.name, cute.provider, img));
  }

  return json({ error: "bad request" }, { status: 400 });
}

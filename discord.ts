import nacl from "https://cdn.skypack.dev/tweetnacl@v1.0.3?dts";

export interface DiscordRequest {
  data: data;
  type: number;
}
interface data {
  name: string;
  type: number;
}

export function cuteData(name: string, from: string, url: string) {
  return {
    type: 4,
    data: {
      embeds: [
        {
          title: `Random ${name}`,
          type: "image",
          color: 0xffcc80,
          footer: from ? { text: `Image from ${from}` } : undefined,
          image: { url: url },
          url: url,
        },
      ],
    },
  };
}

export function verifySignature(
  signature: string,
  timestamp: string,
  body: string,
): boolean {
  const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;
  return nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY),
  );
}

function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)));
}

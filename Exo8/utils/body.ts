import { IncomingMessage } from "http";

export async function lireBody(
  req: IncomingMessage
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", chunk => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("JSON invalide"));
      }
    });

    req.on("error", reject);
  });
}
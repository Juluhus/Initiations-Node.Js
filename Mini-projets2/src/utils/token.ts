export interface TokenPayload {
  userId: number;
  email: string;
  exp: number;
}

export function genererToken(payload: TokenPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifierToken(token: string): TokenPayload | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    if (decoded.exp < Date.now()) return null;

    return decoded;
  } catch {
    return null;
  }
}
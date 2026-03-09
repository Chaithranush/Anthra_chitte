import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "your-secret-key-change-in-production";

export interface JWTPayload {
  userId: string;
  email: string;
  exp?: number;
}

export function signToken(payload: Omit<JWTPayload, "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

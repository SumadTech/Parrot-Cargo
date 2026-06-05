import jwt, { type Secret } from "jsonwebtoken";

export type AdminTokenPayload = {
  sub: string;
  email: string;
  role: "admin";
};

function getJwtSecret(): Secret {
  const secret = process.env.JWT_SECRET;

  if (typeof secret !== "string" || secret.length === 0) {
    throw new Error("Missing JWT_SECRET environment variable.");
  }

  return secret;
}

export function signAdminToken(payload: AdminTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyAdminToken(token: string): AdminTokenPayload {
  return jwt.verify(token, getJwtSecret()) as AdminTokenPayload;
}
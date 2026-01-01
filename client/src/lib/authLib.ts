import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.TOKEN_SECRET);

export async function encrypt(payload: object) {
  return await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;

  if (!session) return null;
  return await decrypt(session);
}

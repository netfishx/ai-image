import { CborDecoderBase } from "@jsonjoy.com/json-pack/lib/cbor/CborDecoderBase";
import { CborEncoder } from "@jsonjoy.com/json-pack/lib/cbor/CborEncoder";
import LZString from "lz-string";
import { cookies } from "next/headers";
import { z } from "zod";

const encoder = new CborEncoder();
const decoder = new CborDecoderBase();

const expiresTime = 24 * 60 * 60 * 1000;

export const UserSchema = z.object({
  id: z.string(),
  mainId: z.string(),
  username: z.string(),
  inviteCode: z.string().nullish(),
  token: z.string(),
});

type User = z.infer<typeof UserSchema>;

const SessionSchema = UserSchema.extend({
  expires: z.string(),
});

export type SessionData = z.infer<typeof SessionSchema>;

function signToken(payload: SessionData) {
  const encoded = encoder.encode(payload);
  return LZString.compressToEncodedURIComponent(
    String.fromCharCode.apply(null, [...encoded]),
  );
}

function verifyToken(input: string) {
  return SessionSchema.parse(
    decoder.decode(
      new Uint8Array(
        LZString.decompressFromEncodedURIComponent(input)
          .split("")
          .map((c) => c.charCodeAt(0)),
      ),
    ),
  );
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return null;
  }
  return verifyToken(session);
}

export async function setSession(user: User) {
  const expires = new Date(Date.now() + expiresTime);
  const session: SessionData = {
    ...user,
    expires: expires.toISOString(),
  };
  const encryptedSession = signToken(session);
  (await cookies()).set("session", encryptedSession, {
    expires,
    httpOnly: true,
    // secure: true,
    sameSite: "lax",
  });
}

export async function getToken() {
  const session = await getSession();
  return session?.token;
}

export async function signOut() {
  (await cookies()).delete("session");
}

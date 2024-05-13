"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import myLink from "./link";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import crypto from "crypto";

export const encryptPassword = async (word) => {
  if (!word) return "";
  try {
    return crypto
      .createHmac("sha256", "helloHeinSoe")
      .update(word)
      .digest("hex");
  } catch (err) {
    return "";
  }
};

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

// Function to create and sign a JWT
async function encrypt(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Specify the signing algorithm
    .setIssuedAt() // Set the issued at time (current time)
    .setExpirationTime("24h") // Set the expiration time (24 hours from now)
    .sign(key); // Sign the token with the secret key
  return token;
}

// Function to verify a JWT
async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}
export async function login({ username, password }) {
  console.log(await encryptPassword(password));
  // Verify credentials && get the user
  try {
    const user = {
      id: 1,
      username: "heinsoe",
      password: "a8bfd0947ca0cc7f43f48e74755cd64ec19ed8c4a59aa28169a1401edc63109c",
      name: "Hein Soe",
      avatar: "",
    };
    if (
      username == user.username &&
      user?.password == (await encryptPassword(password))
    ) {
      const { id, username, name, avatar } = user;
      const expires = new Date(dayjs().add(1, "days"));
      const session = await encrypt({
        user: { id, username, name, avatar },
        expires,
      });

      cookies().set("session", session, { expires, httpOnly: true });
    } else {
      throw new Error("wrong username or password!");
    }
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  console.log("log Out");
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect(myLink.signin(), "replace");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const se = await decrypt(session);
  return se;
}

export async function updateSession(request) {
  console.log("check session");
  const session = await request.cookies.get("session")?.value;
  if (!session) throw new Error("no session");

  // Refresh the session so it doesn't expire
  var parsed = await decrypt(session);
  parsed.expires = new Date(dayjs().add(1, "days"));
  // console.log(parsed);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

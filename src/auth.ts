"use server";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "@/service/db";

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

const tomorrow = () => dayjs().add(1, "days").toDate(); // Convert Day.js object to JavaScript Date object

// Function to create and sign a JWT
async function encrypt(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Specify the signing algorithm
    .setIssuedAt() // Set the issued at time (current time)
    .setExpirationTime("24h") // Set the expiration time (24 hours from now)
    .sign(key); // Sign the token with the secret key
  return token;
}

// Function to verify a JWT
async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  // Verify credentials && get the user

  try {
    const _username = "heinsoe";
    const _password =
      "4f5b269a2d14d3c7ca89a2861689743b2624cb6b7a396d18d555b8cf49a02d71";
    const pass = await encryptPassword(password);
    console.log(_password);
    const user = {
      name: "Hein Soe",
    };
    if (username == _username && pass == _password) {
      const session = await encrypt({
        user,
        expires: tomorrow(),
      });
      cookies().set("session", session, {
        expires: tomorrow(),
        httpOnly: true,
      });
      return true;
    } else {
      throw new Error("username or password is wrong.");
    }
    // await prisma.user
    //   .findFirstOrThrow({ where: { username }, include: { role: true } })
    //   .then(async (user) => {
    //     const pass = await encryptPassword(password);
    //     // console.log(pass)
    //     if (user.password == pass) {
    //       const { id, username, fullName, avatarUrl, role } = user;
    // const session = await encrypt({
    //   user,
    //   expires: tomorrow(),
    // });

    // cookies().set("session", session, {
    //   expires: tomorrow(),
    //   httpOnly: true,
    // });
    //     } else {
    //       throw new Error("username or password is wrong.");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     throw new Error("username or password is wrong.");
    //   });
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  console.log("log Out");
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const se = await decrypt(session);
  return se;
}

export async function updateSession(request: NextRequest) {
  // console.log("check session");
  const session = await request.cookies.get("session")?.value;
  if (!session) throw new Error("no session");

  // Refresh the session so it doesn't expire
  var parsed = await decrypt(session);
  if (!parsed) throw new Error("no session");
  //expire tomorrow

  // console.log(parsed);
  parsed.expires = tomorrow();
  var res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date, // Explicitly type parsed.expires as Date
  });
  return res;
}

export const encryptPassword = async (word: string) => {
  if (!word) return "";
  try {
    return crypto
      .createHmac("sha256", "BDATAMITTKey123321")
      .update(word)
      .digest("hex");
  } catch (err) {
    return "";
  }
};

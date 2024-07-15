import { NextRequest } from "next/server";

export function QueryJson(req: NextRequest): Record<string, string | string[]> {
  const searchParams = req.nextUrl.search;
  const queryString = searchParams.split("?")[1];
  const params = new URLSearchParams(queryString);
  const json: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    if (json[key] === undefined) {
      json[key] = value;
    } else {
      if (!Array.isArray(json[key])) {
        json[key] = [json[key] as string];
      }
      (json[key] as string[]).push(value);
    }
  });

  return json;
}

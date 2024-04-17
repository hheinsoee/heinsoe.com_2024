import { APP } from "@/constant";

export async function getSetting() {
  const res = await fetch(`${APP.API.Setting}`, {
    next: { tags: ["setting"] },
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

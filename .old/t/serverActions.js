"use server"
import { revalidatePath, revalidateTag } from "next/cache";

export async function _revalidatePath(path) {
  console.log({revalide:path})
  return revalidatePath(path);
}
export async function _revalidateTags(collection) {
  return revalidateTag(collection);
}
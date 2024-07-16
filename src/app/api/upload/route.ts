import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import sharp from "sharp"; // Import sharp for image processing
import { createImage } from "@service/image.service";
import { getSession } from "@/auth";
const formatFilename = (filename: string) => {
  // Remove spaces and convert to camelCase
  return filename
    .replace(/\s+/g, "")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
};
export async function POST(req: Request) {
  try {
    const session = await getSession();
    const user = session?.user;
    if (user) {
      const formData = await req.formData();

      const file = formData.get("file") as File;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Resize image to maximum width of 1080 pixels
      const resizedBuffer = await sharp(buffer)
        .resize({ width: 1080 }) // Adjust dimensions as needed
        .toBuffer();

      // Save the resized image to file system
      const timestamp = Date.now();
      const filename = `${timestamp}-${formatFilename(file.name)}`;
      await fs.writeFile(`${process.env.NEXT_PUBLIC_IMAGE_DIR}/${filename}`, resizedBuffer);

      // Create image record in database
      const res = await createImage({
        data: {
          caption: file.name,
          fileName: filename,
        },
      });

      // Invalidate cache or update as needed
      revalidatePath("/");

      // Return success response
      return NextResponse.json(res);
    } else {
      throw new Error("Unauthorized");
    }
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

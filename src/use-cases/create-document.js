import { createSignedUploadUrl } from "../lib/supabase.js";
import { Document } from "../models/document.js";

export async function createDocument({ filename }) {
  const { publicUrl, signedUrl } = await createSignedUploadUrl(filename)
  const document = new Document({
    filename,
    publicUrl,
  })

  await document.save()

  return { signedUrl }
}
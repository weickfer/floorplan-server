import { createSignedUploadUrl } from "../lib/supabase.js";
import { Annotation } from "../models/annotation.js";

export async function createAnnotation(
  { title, description, visibility, priority, type, disciplines, attachments: _attachments }
) {
  const attachments = await Promise.all(
    _attachments.map(
      async attachment => {
        const { publicUrl, signedUrl } = await createSignedUploadUrl(attachment.name)
        return ({
          name: attachment.name,
          publicUrl,
          signedUrl,
          vectors: attachment.vectors,
        })
      }
    )
  )

  const annotation = new Annotation({
    title,
    type,
    disciplines,
    description,
    attachments: attachments.map(attachment => ({
      name: attachment.name,
      publicUrl: attachment.publicUrl,
      vectors: attachment.vectors,
    })),
    visibility,
    priority,
  })

  await annotation.save()

  const signedUrlByName = attachments.reduce((acc, attachment) => {
    acc[attachment.name] = attachment.signedUrl

    return acc
  }, {})

  return { signedUrls: signedUrlByName }
}
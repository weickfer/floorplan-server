const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const createPath = (filename) => `documents/${filename}` 

async function createSignedUploadUrl(fileName) {
  const uniqueFilename = `${crypto.randomUUID()}-${fileName}`
  const path = createPath(uniqueFilename)

  const { data } = await supabase.storage.from('sheets').createSignedUploadUrl(
    path,
  )

  const { publicUrl } = supabase.storage.from('sheets').getPublicUrl(path).data

  return {
    signedUrl: data.signedUrl,
    publicUrl,
  }
}

module.exports = { supabase, createSignedUploadUrl, createPath }
import { randomUUID } from 'node:crypto'
import { supabase } from '../../lib/supabase.js'

export class SupabaseStorageProvider {
  async createFile(filename) {
    const uniqueFilename = `${randomUUID()}-${filename}`
    const path = `v2/${uniqueFilename}` 

    const signedUploadUrl = await supabase.storage.from('sheets').createSignedUploadUrl(
      path,
    )
    
    const { signedUrl } = signedUploadUrl.data
    const { publicUrl } = supabase.storage.from('sheets').getPublicUrl(path).data

    return {
      signedUrl,
      publicUrl,
    }
  }

  async deleteFile(publicUrl) {
    const isValid = publicUrl.includes('supabase.co')
    
    if(!isValid) return

    const filename = publicUrl.split('/').pop()
    const path = `v2/${filename}`

    await supabase.storage.from('sheets').remove([path])

  }
}
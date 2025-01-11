import { randomUUID } from 'node:crypto'

export class MockStorageProvider {
  async createFile(filename) {
    const uniqueFilename = `${randomUUID()}-${filename}`
    const path = `v2/${uniqueFilename}` 
    
    return {
      signedUrl: `MOCK>SIGNED_URL: ${path}`,
      publicUrl: `MOCK>PUBLIC_URL: ${path}`
    }
  }

  async deleteFile(filename) {
    return
  }
}
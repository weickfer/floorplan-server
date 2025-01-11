import { MockStorageProvider } from "./storage/mock.js";
import { SupabaseStorageProvider } from "./storage/supabase.js";

const mockStorageProvider = new MockStorageProvider()
const supabaseStorageProvider = new SupabaseStorageProvider()

export const storageProvider = supabaseStorageProvider
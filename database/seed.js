import crypto from 'node:crypto'
import { k } from "../src/lib/knex.js";

const disciplines = [
  {
    name: 'Engenharia',
    slug: 'ENG'
  },
  {
    name: 'Acessibilidade',
    slug: 'ACE'
  },
  {
    name: 'Acústica',
    slug: 'ACU'
  },
  {
    name: 'Alvenaria',
    slug: 'ALV'
  },
  {
    name: 'Aquecimento',
    slug: 'AQC'
  },
  {
    name: 'Arquitetura',
    slug: 'ARQ'
  },
  {
    name: 'Aspiração',
    slug: 'ASP'
  },
  {
    name: 'Bombeiro',
    slug: 'BOM'
  },
  {
    name: 'Cabeamento',
    slug: 'CAB'
  },
  {
    name: 'Compatibilização',
    slug: 'CPT'
  },
  {
    name: 'Coordenação',
    slug: 'COO'
  },
  {
    name: 'Hidráulica',
    slug: 'HID'
  }
].map(item => ({ id: crypto.randomUUID(), ...item }))

async function main() {
  const [{ count }] = await k('disciplines').count()
  if(Number(count) !== 0) return

  await k('disciplines').insert(disciplines)
}
main().finally(() => {
  process.exit(0)
})
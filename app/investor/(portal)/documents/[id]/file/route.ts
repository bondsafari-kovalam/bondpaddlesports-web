import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { findDocument } from '@/lib/investor/content'
import { getInvestorSession } from '@/lib/investor/session'

const privateHeaders = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' }

/**
 * The bytes behind the in-portal document reader. The file sits in private/investor-documents/
 * (traced into this route by next.config), so this signed-in route is the only way to reach it.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getInvestorSession())) return new Response('Unauthorised', { status: 401, headers: privateHeaders })

  const file = findDocument((await params).id)?.readerFile
  if (!file) return new Response('Not found', { status: 404, headers: privateHeaders })

  const body = new Uint8Array(await readFile(path.join(process.cwd(), 'private', 'investor-documents', file)))
  return new Response(body, { headers: { ...privateHeaders, 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline' } })
}

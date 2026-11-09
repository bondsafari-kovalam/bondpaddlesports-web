import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { findDocument } from '@/lib/investor/content'
import { getInvestorSession } from '@/lib/investor/session'

const robots = { 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff' }
const refused = { ...robots, 'Cache-Control': 'private, no-store' }

/**
 * Kept in this browser's own cache, but `no-cache` makes it ask on every visit: the session is
 * checked first, and an unchanged file answers 304 with no body. `no-transform` stops gzip from
 * dropping Content-Length, which the reader's progress bar needs.
 */
const cacheable = { ...robots, 'Cache-Control': 'private, no-cache, no-transform' }

/** Tagged by content hash, so a replaced file gets a new tag even when its size and timestamp don't change. */
async function load(file: string) {
  const bytes = new Uint8Array(await readFile(path.join(process.cwd(), 'private', 'investor-documents', file)))
  return { bytes, tag: `"${createHash('sha256').update(bytes).digest('base64url').slice(0, 27)}"` }
}

/** One `bytes=` range (start-end, start-, or -suffix); null means send the whole file, 'invalid' means 416. */
function parseRange(header: string | null, size: number): { start: number; end: number } | null | 'invalid' {
  const match = header?.match(/^bytes=(\d*)-(\d*)$/)
  if (!match || (!match[1] && !match[2])) return null
  if (!match[1]) {
    const suffix = Number(match[2])
    return suffix > 0 ? { start: Math.max(size - suffix, 0), end: size - 1 } : 'invalid'
  }
  const start = Number(match[1])
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1
  return start < size && start <= end ? { start, end } : 'invalid'
}

/**
 * The bytes behind the in-portal document reader. The file sits in private/investor-documents/
 * (traced into this route by next.config), so this signed-in route is the only way to reach it.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getInvestorSession())) return new Response('Unauthorised', { status: 401, headers: refused })

  const file = findDocument((await params).id)?.readerFile
  if (!file) return new Response('Not found', { status: 404, headers: refused })

  const { bytes, tag } = await load(file)
  const size = bytes.byteLength
  const headers = { ...cacheable, ETag: tag, 'Accept-Ranges': 'bytes', 'Content-Type': 'application/pdf', 'Content-Disposition': 'inline' }

  if (request.headers.get('If-None-Match')?.split(',').some((t) => t.trim().replace(/^W\//, '') === tag)) {
    return new Response(null, { status: 304, headers })
  }

  // A range is only honoured against the version the client already holds.
  const ifRange = request.headers.get('If-Range')
  const range = ifRange && ifRange !== tag ? null : parseRange(request.headers.get('Range'), size)
  if (range === 'invalid') return new Response(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${size}` } })
  if (range) {
    return new Response(bytes.subarray(range.start, range.end + 1), {
      status: 206,
      headers: { ...headers, 'Content-Range': `bytes ${range.start}-${range.end}/${size}`, 'Content-Length': String(range.end - range.start + 1) },
    })
  }
  return new Response(bytes, { headers: { ...headers, 'Content-Length': String(size) } })
}

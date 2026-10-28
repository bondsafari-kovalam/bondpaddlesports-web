// Prints an scrypt hash for INVESTOR_ADMIN_PASSWORD, so the plain password never sits in Vercel settings.
// Usage: node scripts/hash-investor-password.mjs   (prompts for the password; nothing is echoed or saved)
import { randomBytes, scryptSync } from 'node:crypto'
import { createInterface } from 'node:readline'

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
rl._writeToOutput = () => {}
process.stdout.write('Password: ')
rl.question('', (password) => {
  rl.close()
  process.stdout.write('\n')
  if (password.length < 12) {
    console.error('Use at least 12 characters.')
    process.exit(1)
  }
  const salt = randomBytes(16)
  console.log(`scrypt:${salt.toString('base64')}:${scryptSync(password, salt, 64).toString('base64')}`)
})

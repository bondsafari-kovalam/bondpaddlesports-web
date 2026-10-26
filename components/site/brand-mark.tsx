export function BrandMark({ className = 'h-14 sm:h-16' }: { className?: string }) {
  return (
    <a href="/" className="flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5b82e]" aria-label="Bond Safari Paddle Sports home">
      <img src="/logo.png" alt="Bond Safari Paddle Sports" className={`${className} w-auto`} />
    </a>
  )
}

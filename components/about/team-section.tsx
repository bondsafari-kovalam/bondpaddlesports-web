import { Eyebrow } from '@/components/locations/primitives'
import { RevealGroup, RevealLines } from '@/components/motion/reveal'
import { SmartImage } from '@/components/site/smart-image'
import { TEAM, type TeamMember } from '@/lib/team'

const initials = (name: string) => name.split(' ').map((part) => part[0]).slice(0, 2).join('')

/** Portrait ringed in the member's accent; a fixed 8rem box so nothing shifts as photos load. */
function Portrait({ member }: { member: TeamMember }) {
  return (
    <div className="mx-auto size-32 rounded-full p-1 lg:mx-0" style={{ boxShadow: `inset 0 0 0 2px ${member.accent}` }}>
      {member.photo ? (
        <SmartImage src={member.photo} alt={`Portrait of ${member.name}, ${member.role}`} width={160} height={160} sizes="128px" className="size-full rounded-full object-cover" />
      ) : (
        <span role="img" aria-label={`Portrait of ${member.name} coming soon`} className="flex size-full items-center justify-center rounded-full bg-ink-soft font-display text-3xl font-black text-white/70">{initials(member.name)}</span>
      )}
    </div>
  )
}

export function TeamSection() {
  return (
    <section id="team" className="scroll-mt-16 bg-ink px-5 py-24 text-white lg:px-8 lg:py-32" aria-labelledby="team-title">
      <div className="mx-auto max-w-7xl">
        <Eyebrow tone="cyan">The team</Eyebrow>
        <h2 id="team-title" className="mt-3 max-w-3xl font-display text-4xl font-black tracking-tight sm:text-5xl"><RevealLines>Operators who have run water sports for decades.</RevealLines></h2>
        <div className="mt-8 flex h-1 w-full max-w-sm overflow-hidden rounded-full" aria-hidden>
          {TEAM.map((member) => <span key={member.name} className="flex-1" style={{ backgroundColor: member.accent }} />)}
        </div>
        <RevealGroup as="ul" className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 min-[1200px]:grid-cols-4">{TEAM.map((member) => (
            <li key={member.name} className="text-center lg:text-left">
              <Portrait member={member} />
              <h3 className="mt-6 font-display text-xl font-bold tracking-tight">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-teal-pale">{member.role}</p>
              <div className="mx-auto mt-5 h-px w-12 bg-sand lg:mx-0" aria-hidden />
              <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/70">{member.bio}</p>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

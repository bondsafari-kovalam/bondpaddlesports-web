import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { DataTable, Note, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import { ProtectedContent } from '@/components/investor/protected-content'
import { BackToStudies, Bullets, LinkedSources, Numbered, Para, SectionLinks, StudyCover, StudyTable, Verdict } from '@/components/investor/study-ui'
import { PREPARED_BY } from '@/lib/investor/feasibility-data'
import {
  ACADEMY, BASE_INTRO, BASE_OPTIONS, BASE_POINTS, CLOSING_NOTE, CONFLICTS, COVER_FACTS, COVER_NOTE, ECONOMICS_CLOSING, ECONOMICS_INTRO, FUNDED_SITES, HOW_TO_READ,
  HUB_COST, HUB_HOLDS, HUB_INTRO, KEY_NUMBERS, LAUNCH_PLAN, PEOPLE, PERMITS, REGION, RISK_REGISTER, SAFETY, SEASONS, SOURCES, SPOKES, SPOKES_INTRO, SPOKES_NOTE,
  SPOKES_POINTS, SUMMARY, VERDICT,
} from '@/lib/investor/feasibility-trivandrum-hub-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Trivandrum hub feasibility study' }

const SECTIONS = [
  ['summary', 'Summary'], ['hub-role', 'What the hub does'], ['base', 'Where to base it'], ['spokes', 'Spokes'], ['economics', 'Economics'], ['academy', 'Academy'],
  ['people', 'People'], ['permits', 'Permits & safety'], ['risks', 'Risks'], ['launch-plan', 'Launch plan'], ['sources', 'Sources'],
]

export default async function TrivandrumHubFeasibility() {
  await requireInvestorSession()
  return (
    <ProtectedContent>
      <BackToStudies className="mb-8" />

      <PageIntro eyebrow="Bond Safari Paddle Sports Pvt Ltd" title="Trivandrum Hub">
        <p className="font-semibold text-teal-strong">Hub Feasibility Study</p>
        <p>{PREPARED_BY}</p>
      </PageIntro>

      <p className="mt-5 flex w-fit items-center gap-2 rounded-full bg-sand-soft px-3.5 py-1.5 text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />View only. This study cannot be downloaded, copied or printed.</p>

      <SectionLinks label="Study sections" sections={SECTIONS} />

      <StudyCover facts={COVER_FACTS} verdict={VERDICT} note={COVER_NOTE} howToRead={HOW_TO_READ} />

      <div className="mt-14 space-y-14">
        <PortalSection id="summary" eyebrow="Overview" title="Executive summary">
          <Verdict text={VERDICT} />
          <div className="mt-5">{SUMMARY.map((text) => <Para key={text} point={{ text }} />)}</div>
          <StudyTable table={KEY_NUMBERS} />
          <h3 className="mt-10 font-display text-xl font-bold tracking-tight">Conflicts and tensions to resolve</h3>
          <Numbered points={CONFLICTS} />
        </PortalSection>

        <PortalSection id="hub-role" eyebrow="Section 1" title="What the hub does">
          {HUB_INTRO.map((text) => <Para key={text} point={{ text }} />)}
          <StudyTable table={HUB_HOLDS} />
          <StudyTable table={REGION} />
          <StudyTable table={SEASONS} />
        </PortalSection>

        <PortalSection id="base" eyebrow="Section 2" title="Where to base it">
          <Para point={{ text: BASE_INTRO }} />
          <div className="mt-4"><DataTable {...BASE_OPTIONS} /></div>
          <Bullets points={BASE_POINTS} />
        </PortalSection>

        <PortalSection id="spokes" eyebrow="Section 3" title="The spokes it serves">
          <Para point={{ text: SPOKES_INTRO }} />
          <div className="mt-4"><DataTable {...SPOKES} /></div>
          <Note>{SPOKES_NOTE}</Note>
          <Bullets points={SPOKES_POINTS} />
        </PortalSection>

        <PortalSection id="economics" eyebrow="Section 4" title="Hub economics">
          {ECONOMICS_INTRO.map((text) => <Para key={text} point={{ text }} />)}
          <StudyTable table={FUNDED_SITES} />
          <StudyTable table={HUB_COST} />
          <Para point={{ text: ECONOMICS_CLOSING }} />
        </PortalSection>

        <PortalSection id="academy" eyebrow="Section 5" title="The Academy campus">
          {ACADEMY.map((text) => <Para key={text} point={{ text }} />)}
        </PortalSection>

        <PortalSection id="people" eyebrow="Section 6" title="People and organisation">
          <DataTable {...PEOPLE} />
        </PortalSection>

        <PortalSection id="permits" eyebrow="Section 7" title="Permits, safety and related parties">
          {PERMITS.map((point) => <Para key={point.text} point={point} />)}
          <StudyTable table={SAFETY} />
        </PortalSection>

        <PortalSection id="risks" eyebrow="Section 8" title="Risks">
          <DataTable {...RISK_REGISTER} />
        </PortalSection>

        <PortalSection id="launch-plan" eyebrow="Section 9" title="Launch plan and gates">
          <DataTable {...LAUNCH_PLAN} />
        </PortalSection>

        <PortalSection id="sources" eyebrow="References" title="Sources">
          <LinkedSources sources={SOURCES} />
          <p className="mt-6 text-sm italic leading-6 text-slate">{CLOSING_NOTE}</p>
        </PortalSection>
      </div>

      <BackToStudies className="mt-12" />
    </ProtectedContent>
  )
}

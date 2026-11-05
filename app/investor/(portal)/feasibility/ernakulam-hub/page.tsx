import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { DataTable, Note, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import { ProtectedContent } from '@/components/investor/protected-content'
import { BackToStudies, Bullets, Heading, LinkedSources, Numbered, Para, SectionLinks, StudyCover, StudyTable, Verdict } from '@/components/investor/study-ui'
import { PREPARED_BY } from '@/lib/investor/feasibility-data'
import * as study from '@/lib/investor/feasibility-ernakulam-hub-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Ernakulam hub feasibility study' }

const SECTIONS = [
  ['summary', 'Summary'], ['hub-role', 'What the hub does'], ['base', 'Where to base it'], ['spokes', 'Spokes'], ['economics', 'Economics'], ['academy', 'Academy'],
  ['people', 'People'], ['permits', 'Permits & safety'], ['risks', 'Risks'], ['launch-plan', 'Launch plan'], ['sources', 'Sources'],
]

export default async function ErnakulamHubFeasibility() {
  await requireInvestorSession()
  return (
    <ProtectedContent>
      <BackToStudies className="mb-8" />

      <PageIntro eyebrow="Bond Safari Paddle Sports Pvt Ltd" title="Ernakulam Hub">
        <p className="font-semibold text-teal-strong">Hub Feasibility Study</p>
        <p>{PREPARED_BY}</p>
      </PageIntro>

      <p className="mt-5 flex w-fit items-center gap-2 rounded-full bg-sand-soft px-3.5 py-1.5 text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />View only. This study cannot be downloaded, copied or printed.</p>

      <SectionLinks label="Study sections" sections={SECTIONS} />

      <StudyCover facts={study.COVER_FACTS} verdict={study.VERDICT} note={study.COVER_NOTE} howToRead={study.HOW_TO_READ} />

      <div className="mt-14 space-y-14">
        <PortalSection id="summary" eyebrow="Overview" title="Executive summary">
          <Verdict title={study.VERDICT_TITLE} text={study.VERDICT} />
          <div className="mt-5">{study.SUMMARY.map((text) => <Para key={text} point={{ text }} />)}</div>
          <StudyTable table={study.KEY_NUMBERS} />
          <Heading>Conflicts and tensions to resolve</Heading>
          <Numbered points={study.CONFLICTS} />
        </PortalSection>

        <PortalSection id="hub-role" eyebrow="Section 1" title="What the hub does">
          {study.HUB_INTRO.map((text) => <Para key={text} point={{ text }} />)}
          <StudyTable table={study.HUB_HOLDS} />
          <StudyTable table={study.REGION} />
          <StudyTable table={study.SEASONS} />
        </PortalSection>

        <PortalSection id="base" eyebrow="Section 2" title="Where to base it">
          <Para point={{ text: study.BASE_INTRO }} />
          <div className="mt-4"><DataTable {...study.BASE_OPTIONS} /></div>
          <Bullets points={study.BASE_POINTS} />
        </PortalSection>

        <PortalSection id="spokes" eyebrow="Section 3" title="The spokes it serves">
          <Para point={{ text: study.SPOKES_INTRO }} />
          <div className="mt-4"><DataTable {...study.SPOKES} /></div>
          <Note>{study.SPOKES_NOTE}</Note>
          <Bullets points={study.SPOKES_POINTS} />
        </PortalSection>

        <PortalSection id="economics" eyebrow="Section 4" title="Hub economics">
          {study.ECONOMICS_INTRO.map((text) => <Para key={text} point={{ text }} />)}
          <StudyTable table={study.FUNDED_SITES} />
          <StudyTable table={study.HUB_COST} />
          <Para point={{ text: study.ECONOMICS_CLOSING }} />
        </PortalSection>

        <PortalSection id="academy" eyebrow="Section 5" title="The Academy campus">
          {study.ACADEMY.map((text) => <Para key={text} point={{ text }} />)}
        </PortalSection>

        <PortalSection id="people" eyebrow="Section 6" title="People and organisation">
          <DataTable {...study.PEOPLE} />
        </PortalSection>

        <PortalSection id="permits" eyebrow="Section 7" title="Permits, safety and related parties">
          {study.PERMITS.map((point) => <Para key={point.text} point={point} />)}
          <StudyTable table={study.SAFETY} />
        </PortalSection>

        <PortalSection id="risks" eyebrow="Section 8" title="Risks">
          <DataTable {...study.RISK_REGISTER} />
        </PortalSection>

        <PortalSection id="launch-plan" eyebrow="Section 9" title="Launch plan and gates">
          <DataTable {...study.LAUNCH_PLAN} />
        </PortalSection>

        <PortalSection id="sources" eyebrow="References" title="Sources">
          <LinkedSources sources={study.SOURCES} />
          <p className="mt-6 text-sm italic leading-6 text-slate">{study.CLOSING_NOTE}</p>
        </PortalSection>
      </div>

      <BackToStudies className="mt-12" />
    </ProtectedContent>
  )
}

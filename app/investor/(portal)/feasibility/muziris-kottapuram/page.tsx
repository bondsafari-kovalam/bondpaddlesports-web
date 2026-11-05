import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { DataTable, Note, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import { ProtectedContent } from '@/components/investor/protected-content'
import { BackToStudies, Bullets, Heading, LinkedSources, Numbered, Para, SectionLinks, StudyCover, StudyTable, Verdict } from '@/components/investor/study-ui'
import { PREPARED_BY } from '@/lib/investor/feasibility-data'
import * as study from '@/lib/investor/feasibility-muziris-kottapuram-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Muziris–Kottapuram feasibility study' }

const SECTIONS = [
  ['summary', 'Summary'], ['why-kottapuram', 'Why Kottapuram'], ['demand', 'Demand'], ['customers', 'Who we sell to'], ['competition', 'Competition'], ['locations', 'Locations'],
  ['models', 'Models'], ['financials', 'Financials'], ['concession', 'The concession'], ['permits', 'Permits & safety'], ['risks', 'Risks'], ['launch-plan', 'Launch plan'], ['sources', 'Sources'],
]

export default async function MuzirisKottapuramFeasibility() {
  await requireInvestorSession()
  return (
    <ProtectedContent>
      <BackToStudies className="mb-8" />

      <PageIntro eyebrow="Bond Safari Paddle Sports Pvt Ltd" title="Muziris–Kottapuram Paddle Centre">
        <p className="font-semibold text-teal-strong">Operating Review and Feasibility Study</p>
        <p>{PREPARED_BY}</p>
      </PageIntro>

      <p className="mt-5 flex w-fit items-center gap-2 rounded-full bg-sand-soft px-3.5 py-1.5 text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />View only. This study cannot be downloaded, copied or printed.</p>

      <SectionLinks label="Study sections" sections={SECTIONS} />

      <StudyCover facts={study.COVER_FACTS} verdict={study.VERDICT} note={study.COVER_NOTE} howToRead={study.HOW_TO_READ} />

      <div className="mt-14 space-y-14">
        <PortalSection id="summary" eyebrow="Overview" title="Executive summary">
          <Verdict title={study.VERDICT_TITLE} text={study.VERDICT} />
          <div className="mt-5">{study.SUMMARY.map((text) => <Para key={text} point={{ text }} />)}</div>
          <Heading>Why Muziris–Kottapuram</Heading>
          <Bullets points={study.SUMMARY_WHY} />
          <StudyTable table={study.SUMMARY_MODELS} />
          <Heading>Conflicts and tensions to resolve</Heading>
          <Numbered points={study.CONFLICTS} />
          <Note>{study.SUMMARY_CAVEAT}</Note>
        </PortalSection>

        <PortalSection id="why-kottapuram" eyebrow="Section 1" title="Why this destination, and how it fits the hub">
          <Para point={{ text: study.WHY_INTRO }} />
          <Heading>The case for this site</Heading>
          <div className="mt-4">{study.WHY_CASE.map((point) => <Para key={point.lead} point={point} />)}</div>
          <StudyTable table={study.HUB_FIT} />
          <StudyTable table={study.SEASONS} />
        </PortalSection>

        <PortalSection id="demand" eyebrow="Section 2" title="How big the demand is">
          <StudyTable table={study.VISITORS} />
          <Para point={{ text: study.VISITORS_NOTE }} />
          <Para point={study.CAPTURE_INTRO} />
          <div className="mt-4"><DataTable {...study.CAPTURE} /></div>
          <Para point={{ text: study.CAPACITY }} />
          <Para point={study.SPEND_INTRO} />
          <Bullets points={study.SPEND_BLEND} />
          <Para point={study.BASE_REVENUE} />
          <Heading>What we still need to check</Heading>
          <Bullets points={study.DEMAND_CHECK} />
        </PortalSection>

        <PortalSection id="customers" eyebrow="Section 3" title="Who we sell to">
          <DataTable {...study.SEGMENTS} />
          <Para point={study.POSITION} />
          <Heading>Segments and activities to avoid at first</Heading>
          <Bullets points={study.SEGMENTS_AVOID} />
        </PortalSection>

        <PortalSection id="competition" eyebrow="Section 4" title="Competition and pricing">
          <StudyTable table={study.OPERATORS} />
          <Heading>Conclusions</Heading>
          <Numbered points={study.COMPETITION_CONCLUSIONS} />
          <StudyTable table={study.PRICE_LIST} />
          <Para point={{ text: study.PRICE_NOTE }} />
        </PortalSection>

        <PortalSection id="locations" eyebrow="Section 5" title="Possible locations">
          <Para point={{ text: study.LOCATIONS_INTRO }} />
          <div className="mt-4"><DataTable {...study.LOCATIONS} /></div>
          <Bullets points={study.LOCATION_POINTS} />
        </PortalSection>

        <PortalSection id="models" eyebrow="Section 6" title="Operating models">
          <div className="space-y-10">{study.MODELS.map((m) => (
            <div key={m.title}>
              <Heading>{m.title}</Heading>
              <div className="mt-4">{m.points.map((point) => <Para key={point.lead} point={point} />)}</div>
            </div>
          ))}</div>
          <Heading>Comparison</Heading>
          <div className="mt-4"><Para point={study.COMPARISON_RESULT} /></div>
          <Note>{study.COMPARISON_KEY}</Note>
          <div className="mt-4"><DataTable {...study.COMPARISON} /></div>
        </PortalSection>

        <PortalSection id="financials" eyebrow="Section 7" title="Financial assessment">
          <Para point={{ text: study.FINANCE_INTRO }} />
          <StudyTable table={study.ASSUMPTIONS} />
          <Heading>What the capex buys</Heading>
          <div className="mt-4">{study.CAPEX.map((point) => <Para key={point.lead} point={point} />)}</div>
          <StudyTable table={study.MATURE_YEAR} />
          <StudyTable table={study.FIVE_YEAR_PATH} />
          <StudyTable table={study.SENSITIVITY} />
          <Para point={study.SENSITIVITY_READING} />
          <StudyTable table={study.REVENUE_SHARES} />
          <Para point={{ text: study.REVENUE_SHARES_NOTE }} />
        </PortalSection>

        <PortalSection id="concession" eyebrow="Section 8" title="The Muziris concession: ownership and terms">
          {study.CONCESSION_INTRO.map((text) => <Para key={text} point={{ text }} />)}
          <StudyTable table={study.TERMS} />
          <Heading>Questions to put now</Heading>
          <Numbered points={study.QUESTIONS} />
          <Para point={study.SITE_HOLDER} />
        </PortalSection>

        <PortalSection id="permits" eyebrow="Section 9" title="Permits, environment and safety">
          <Para point={{ text: study.PERMITS_INTRO }} />
          <StudyTable table={study.PERMITS} />
          <Para point={study.KATPS_CONFLICT} />
          <Heading>Environmental and community commitments</Heading>
          <Bullets points={study.ENVIRONMENT} />
          <StudyTable table={study.SAFETY} />
        </PortalSection>

        <PortalSection id="risks" eyebrow="Section 10" title="Risks">
          <DataTable {...study.RISK_REGISTER} />
          <Para point={study.RISK_NOTE} />
        </PortalSection>

        <PortalSection id="launch-plan" eyebrow="Section 11" title="Recommendation and launch plan">
          <Heading>Recommendation</Heading>
          <Numbered points={study.RECOMMENDATION} />
          <StudyTable table={study.LAUNCH_PLAN} />
          <StudyTable table={study.KPIS} />
          <Para point={{ text: study.RETHINK_NOTE }} />
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

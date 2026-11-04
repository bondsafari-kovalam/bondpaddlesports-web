import type { Metadata } from 'next'
import { Lock } from 'lucide-react'
import { DataTable, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import { ProtectedContent } from '@/components/investor/protected-content'
import { Bullets, Heading, Numbered, Para, SectionLinks, StudyTable, body } from '@/components/investor/study-ui'
import * as study from '@/lib/investor/feasibility-alappuzha-data'
import { PREPARED_BY } from '@/lib/investor/feasibility-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Alappuzha feasibility study' }

const SECTIONS = [
  ['summary', 'Summary'], ['why-alappuzha', 'Why Alappuzha'], ['demand', 'Demand'], ['customers', 'Who we sell to'], ['competition', 'Competition'], ['locations', 'Locations'],
  ['models', 'Models'], ['financials', 'Financials'], ['blueway', 'Blueway & terms'], ['permits', 'Permits & safety'], ['risks', 'Risks'], ['launch-plan', 'Launch plan'], ['sources', 'Sources'],
]

export default async function AlappuzhaFeasibility() {
  await requireInvestorSession()
  return (
    <ProtectedContent>
      <PageIntro eyebrow="Feasibility study · Alappuzha" title="Alappuzha Paddle Sports Centre: Feasibility Study">
        <p>{PREPARED_BY}</p>
      </PageIntro>

      <p className="mt-5 flex w-fit items-center gap-2 rounded-full bg-sand-soft px-3.5 py-1.5 text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />View only. This study cannot be downloaded, copied or printed.</p>

      <SectionLinks label="Study sections" sections={SECTIONS} />

      <div className="mt-10 space-y-14">
        <PortalSection id="summary" eyebrow="Overview" title="Executive summary">
          <Para point={study.SUMMARY_ANSWER} />
          <Numbered points={study.SUMMARY_PHASES} />
          <Heading>Why Alappuzha</Heading>
          <Bullets points={study.SUMMARY_WHY} />
          <StudyTable table={study.SUMMARY_MODELS} />
          <Heading>How to read this</Heading>
          <Bullets points={study.SUMMARY_HOW_TO_READ} />
          <Heading>Conflicts and tensions to resolve before launch</Heading>
          <Numbered points={study.SUMMARY_CONFLICTS} />
          <p className={`mt-5 ${body}`}>{study.SUMMARY_CAVEAT}</p>
        </PortalSection>

        <PortalSection id="why-alappuzha" eyebrow="Section 1" title="Why Alappuzha, and how it fits the Ernakulam hub">
          <Para point={study.WHY_INTRO} />
          <Bullets points={study.WHY_FACTS} />
          <Heading>Five reasons it is a priority spoke</Heading>
          <Numbered points={study.WHY_REASONS} />
          <StudyTable table={study.HUB_FIT} />
          <StudyTable table={study.SEASONS} />
          <Para point={{ text: study.HYACINTH_NOTE }} />
        </PortalSection>

        <PortalSection id="demand" eyebrow="Section 2" title="How big the demand is">
          <StudyTable table={study.VISITORS} />
          <Para point={study.MARKET_LARGER} />
          <Bullets points={study.MARKET_LEFT_OUT} />
          <Para point={{ text: study.MARKET_CAUTIOUS }} />
          <Para point={study.HOUSEBOAT_CHECK} />
          <Para point={study.CAPTURE_INTRO} />
          <StudyTable table={study.CAPTURE} />
          <Para point={{ text: study.CAPACITY }} />
          <Para point={study.SPEND_INTRO} />
          <Bullets points={study.SPEND_BLEND} />
          <Para point={{ text: study.SPEND_B2B_INTRO }} />
          <Bullets points={study.SPEND_B2B} />
          <Para point={study.BASE_REVENUE} />
          <Para point={study.DEMAND_CHECK_INTRO} />
          <Bullets points={study.DEMAND_CHECK} />
          <Para point={{ text: study.DEMAND_CHECK_NOTE }} />
        </PortalSection>

        <PortalSection id="customers" eyebrow="Section 3" title="Who we sell to">
          <Para point={{ text: study.SEGMENTS_INTRO }} />
          <div className="mt-4"><DataTable {...study.SEGMENTS} /></div>
          <Para point={study.POSITION} />
          <Heading>Segments to avoid at first</Heading>
          <Bullets points={study.SEGMENTS_AVOID} />
        </PortalSection>

        <PortalSection id="competition" eyebrow="Section 4" title="Competition and pricing">
          <StudyTable table={study.OPERATORS} />
          <Heading>Three conclusions</Heading>
          <Numbered points={study.COMPETITION_CONCLUSIONS} />
          <StudyTable table={study.PRICE_LIST} />
          <Para point={{ text: study.PRICE_NOTE }} />
        </PortalSection>

        <PortalSection id="locations" eyebrow="Section 5" title="Possible locations">
          <Para point={{ text: study.LOCATIONS_INTRO }} />
          <div className="mt-4"><DataTable {...study.LOCATIONS} /></div>
          <Heading>What the scores tell us</Heading>
          <Bullets points={study.LOCATION_POINTS} />
        </PortalSection>

        <PortalSection id="models" eyebrow="Section 6" title="The four operating models">
          <div className="space-y-10">{study.MODELS.map((m) => (
            <div key={m.title}>
              <Heading>{m.title}</Heading>
              <Para point={{ lead: 'How it works.', text: m.how }} />
              {m.list && <Bullets points={m.list} />}
              {m.closing && <Para point={{ text: m.closing }} />}
              <Bullets points={m.points} />
            </div>
          ))}</div>
          <StudyTable table={study.COMPARISON} />
          <Para point={study.COMPARISON_RESULT} />
          <Bullets points={study.COMPARISON_POINTS} />
        </PortalSection>

        <PortalSection id="financials" eyebrow="Section 7" title="Financial assessment">
          <Para point={{ text: study.FINANCE_INTRO }} />
          <StudyTable table={study.ASSUMPTIONS} />
          <StudyTable table={study.CAPEX} />
          <StudyTable table={study.MATURE_YEAR} />
          <StudyTable table={study.FIVE_YEAR_PATH} />
          <StudyTable table={study.SENSITIVITY} />
          <Heading>Reading the sensitivities</Heading>
          <Bullets points={study.SENSITIVITY_POINTS} />
          <Heading>{study.DTPC_MATRIX.caption}</Heading>
          <div className="mt-4"><Para point={{ text: study.DTPC_INTRO }} /></div>
          <div className="mt-4"><DataTable {...study.DTPC_MATRIX} /></div>
          <Para point={study.DTPC_MEANS} />
          <Bullets points={study.DTPC_MEANS_POINTS} />
          <Para point={{ text: study.DTPC_CLOSING }} />
          <Heading>Phase 2: Marari satellite (indicative)</Heading>
          <div className="mt-4"><Para point={{ text: study.MARARI }} /></div>
        </PortalSection>

        <PortalSection id="blueway" eyebrow="Section 8" title="The Coastal Blueway, and terms for DTPC and panchayat deals">
          <Heading>How this spoke relates to the Alappuzha Coastal Blueway</Heading>
          <div className="mt-4"><Para point={{ text: study.BLUEWAY_INTRO }} /></div>
          <Bullets points={study.BLUEWAY_TERMS} />
          <Para point={study.BLUEWAY_OVERLAP} />
          <Numbered points={study.BLUEWAY_PROBLEMS} />
          <Heading>Recommended fix (a board decision)</Heading>
          <Bullets points={study.BLUEWAY_FIX} />
          <Para point={{ text: study.BLUEWAY_CLOSING }} />
          <StudyTable table={study.DTPC_TERMS} />
          <Heading>What we need for a panchayat jetty (Model D)</Heading>
          <Bullets points={study.PANCHAYAT_TERMS} />
          <Heading>Questions to put to DTPC Alappuzha now</Heading>
          <Numbered points={study.DTPC_QUESTIONS} />
        </PortalSection>

        <PortalSection id="permits" eyebrow="Section 9" title="Permits, environment and safety">
          <Para point={{ text: study.PERMITS_INTRO }} />
          <Bullets points={study.PERMITS_TIGHTENING} />
          <Para point={{ text: study.PERMITS_CLOSING }} />
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
        </PortalSection>

        <PortalSection id="sources" eyebrow="References" title="Sources">
          <ul className={`space-y-2 ${body}`}>
            {study.SOURCES.map((s) => (
              <li key={s.title} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
                <span className="min-w-0">{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal underline-offset-4 hover:underline">{s.title}</a> : s.title}{s.rest}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm italic leading-6 text-slate">{study.CLOSING_NOTE}</p>
        </PortalSection>
      </div>
    </ProtectedContent>
  )
}

import type { Metadata } from 'next'
import { AlertTriangle, Lock } from 'lucide-react'
import { DataTable, PageIntro, PortalSection } from '@/components/investor/portal-ui'
import { ProtectedContent } from '@/components/investor/protected-content'
import { Bullets, Heading, Lead, Numbered, Para, SectionLinks, StudyTable, body } from '@/components/investor/study-ui'
import {
  ASSUMPTIONS, BASE_REVENUE, BID_CONDITIONS, BID_CONDITIONS_INTRO, BID_KNOWN, BID_UNVERIFIED, CAPACITY, CAPEX, CAPTURE, CAPTURE_INTRO, CLOSING_NOTE,
  COMPANY_INTRO, COMPANY_NOTE, COMPANY_POINTS, COMPARISON, COMPARISON_INTRO, COMPARISON_RESULT, COMPETITION_CONCLUSIONS, CONTRACT_LAYERS, DEMAND_CHECK,
  DEMAND_UPSIDE, DEMAND_UPSIDE_INTRO, DEMAND_UPSIDE_NOTE, ENVIRONMENT, EQUIPMENT_NOTE, FINANCE_INTRO, FIVE_YEAR_PATH, GARGI_QUESTIONS, GARGI_QUESTIONS_LEAD,
  HUB_DISTANCE, HUB_FIT, HYACINTH_NOTE, KATPS_CONFLICT, KPIS, LAUNCH_PLAN, MATURE_YEAR, MODELS, OPERATORS, PADDLE_ONLY, PADDLE_ONLY_ASSUMPTIONS,
  PADDLE_ONLY_INTRO, PADDLE_ONLY_NOTE, PERMITS, PERMITS_INTRO, PREPARED_BY,
  PRICE_LIST, PRICE_NOTE, RECOMMENDATION, RECOMMENDED_BID, RETHINK_NOTE, REVENUE_SHARES, RISK_NOTE, RISK_REGISTER, SAFETY, SEASONS, SENSITIVITY,
  SENSITIVITY_POINTS, SOURCES, SPEND_B2B, SPEND_BLEND, SPEND_INTRO, SUMMARY_ANSWER, SUMMARY_CAVEAT, SUMMARY_CORRECTION, SUMMARY_MEANS, SUMMARY_MODELS,
  SUMMARY_WHY, VISITORS, VISITORS_NOTE, WHY_INTRO, WHY_REASONS,
} from '@/lib/investor/feasibility-data'
import { requireInvestorSession } from '@/lib/investor/session'

export const metadata: Metadata = { title: 'Kumarakom feasibility study' }

const SECTIONS = [
  ['summary', 'Summary'], ['why-kumarakom', 'Why Kumarakom'], ['demand', 'Demand'], ['competition', 'Competition'], ['models', 'Models'], ['financials', 'Financials'],
  ['nalupanku', 'Nalupanku'], ['permits', 'Permits & safety'], ['risks', 'Risks'], ['launch-plan', 'Launch plan'], ['sources', 'Sources'],
]

export default async function KumarakomFeasibility() {
  await requireInvestorSession()
  return (
    <ProtectedContent>
      <PageIntro eyebrow="Feasibility study · Kumarakom" title="Kumarakom Paddle Sports Centre: Feasibility Study">
        <p>{PREPARED_BY}</p>
      </PageIntro>

      <p className="mt-5 flex w-fit items-center gap-2 rounded-full bg-sand-soft px-3.5 py-1.5 text-xs font-bold text-ink"><Lock className="size-3.5 shrink-0" aria-hidden />View only. This study cannot be downloaded, copied or printed.</p>

      <SectionLinks label="Study sections" sections={SECTIONS} />

      <div className="mt-10 space-y-14">
        <PortalSection id="summary" eyebrow="Overview" title="Executive summary">
          <Para point={SUMMARY_ANSWER} />
          <Heading>Why Kumarakom.</Heading>
          <Bullets points={SUMMARY_WHY} />
          <StudyTable table={SUMMARY_MODELS} />
          <Heading>What this means</Heading>
          <Bullets points={SUMMARY_MEANS} />
          <p className="mt-6 flex gap-2.5 rounded-xl bg-sand-soft p-4 text-sm leading-6 text-ink"><AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden /><span><Lead point={SUMMARY_CORRECTION} /></span></p>
          <Para point={{ text: SUMMARY_CAVEAT }} />
        </PortalSection>

        <PortalSection id="why-kumarakom" eyebrow="Section 1" title="Why Kumarakom, and why under the Ernakulam hub">
          <Para point={WHY_INTRO} />
          <Heading>Four reasons it ranks as a top spoke</Heading>
          <Numbered points={WHY_REASONS} />
          <StudyTable table={HUB_FIT} />
          <Para point={{ text: HUB_DISTANCE }} />
          <StudyTable table={SEASONS} />
          <Para point={{ text: HYACINTH_NOTE }} />
        </PortalSection>

        <PortalSection id="demand" eyebrow="Section 2" title="How big the demand is">
          <StudyTable table={VISITORS} />
          <Para point={{ text: VISITORS_NOTE }} />
          <Para point={CAPTURE_INTRO} />
          <StudyTable table={CAPTURE} />
          <Para point={CAPACITY} />
          <Para point={SPEND_INTRO} />
          <Bullets points={SPEND_BLEND} />
          <Para point={{ text: SPEND_B2B }} />
          <Para point={BASE_REVENUE} />
          <Para point={DEMAND_UPSIDE_INTRO} />
          <Bullets points={DEMAND_UPSIDE} />
          <Para point={{ text: DEMAND_UPSIDE_NOTE }} />
          <Para point={DEMAND_CHECK} />
        </PortalSection>

        <PortalSection id="competition" eyebrow="Section 3" title="Competition and pricing">
          <StudyTable table={OPERATORS} />
          <Heading>Three conclusions</Heading>
          <Numbered points={COMPETITION_CONCLUSIONS} />
          <StudyTable table={PRICE_LIST} />
          <Para point={{ text: PRICE_NOTE }} />
        </PortalSection>

        <PortalSection id="models" eyebrow="Section 4" title="The three operating models">
          <div className="space-y-10">{MODELS.map((m) => (
            <div key={m.title}>
              <Heading>{m.title}</Heading>
              <Para point={{ lead: 'How it works.', text: m.how }} />
              {m.list && <Bullets points={m.list} />}
              {m.closing && <Para point={{ text: m.closing }} />}
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-line bg-paper-bright p-5"><p className="font-display text-base font-bold">Strengths</p><Bullets points={m.strengths} /></div>
                <div className="rounded-2xl border border-line bg-paper-bright p-5"><p className="font-display text-base font-bold">Weaknesses</p><Bullets points={m.weaknesses} /></div>
              </div>
            </div>
          ))}</div>
          <Heading>Comparison</Heading>
          <Para point={{ text: COMPARISON_INTRO }} />
          <div className="mt-4"><DataTable {...COMPARISON} /></div>
          <Para point={COMPARISON_RESULT} />
        </PortalSection>

        <PortalSection id="financials" eyebrow="Section 5" title="Financial assessment">
          <Para point={{ text: FINANCE_INTRO }} />
          <StudyTable table={ASSUMPTIONS} />
          <StudyTable table={CAPEX} />
          <StudyTable table={MATURE_YEAR} />
          <StudyTable table={FIVE_YEAR_PATH} />
          <StudyTable table={SENSITIVITY} />
          <Heading>What the sensitivities tell us</Heading>
          <Bullets points={SENSITIVITY_POINTS} />
          <StudyTable table={REVENUE_SHARES} />
          <Para point={PADDLE_ONLY_INTRO} />
          <Bullets points={PADDLE_ONLY_ASSUMPTIONS} />
          <div className="mt-4"><DataTable {...PADDLE_ONLY} /></div>
          <Para point={{ text: PADDLE_ONLY_NOTE }} />
        </PortalSection>

        <PortalSection id="nalupanku" eyebrow="Section 6" title="The Nalupanku sub-lease: how to bid">
          <Para point={BID_KNOWN} />
          <Para point={BID_UNVERIFIED} />
          <StudyTable table={CONTRACT_LAYERS} />
          <Heading>Our conditions for bidding</Heading>
          <Para point={{ text: BID_CONDITIONS_INTRO }} />
          <Numbered points={BID_CONDITIONS} />
          <Heading>The company question</Heading>
          <Para point={{ text: COMPANY_INTRO }} />
          <Bullets points={COMPANY_POINTS} />
          <Para point={{ text: COMPANY_NOTE }} />
          <Heading>Recommended bid</Heading>
          <Bullets points={RECOMMENDED_BID} />
          <Para point={{ lead: GARGI_QUESTIONS_LEAD }} />
          <ol className={`mt-3 space-y-1.5 ${body}`}>{GARGI_QUESTIONS.map((q, i) => <li key={q} className="flex gap-3"><span className="w-5 shrink-0 font-bold text-teal-strong">{String.fromCharCode(97 + i)}.</span>{q}</li>)}</ol>
        </PortalSection>

        <PortalSection id="permits" eyebrow="Section 7" title="Permits, environment and safety">
          <Para point={{ text: PERMITS_INTRO }} />
          <StudyTable table={PERMITS} />
          <Para point={KATPS_CONFLICT} />
          <Heading>Environmental commitments (part of every application)</Heading>
          <Bullets points={ENVIRONMENT} />
          <StudyTable table={SAFETY} />
        </PortalSection>

        <PortalSection id="risks" eyebrow="Section 8" title="Risks">
          <DataTable {...RISK_REGISTER} />
          <Para point={RISK_NOTE} />
        </PortalSection>

        <PortalSection id="launch-plan" eyebrow="Section 9" title="Recommendation and launch plan">
          <Heading>Recommendation</Heading>
          <Numbered points={RECOMMENDATION} />
          <StudyTable table={LAUNCH_PLAN} />
          <Para point={{ text: EQUIPMENT_NOTE }} />
          <StudyTable table={KPIS} />
          <Para point={RETHINK_NOTE} />
        </PortalSection>

        <PortalSection id="sources" eyebrow="References" title="Sources">
          <Bullets points={SOURCES.map((text) => ({ text }))} />
          <p className="mt-6 text-sm italic leading-6 text-slate">{CLOSING_NOTE}</p>
        </PortalSection>
      </div>
    </ProtectedContent>
  )
}

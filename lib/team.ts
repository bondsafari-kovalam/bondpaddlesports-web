/**
 * Bond Group leadership shown in the About page's Team section. Copy is as supplied by Bond;
 * don't add achievements or affiliations here that they haven't approved.
 * Portraits: drop the real photos in public/images/bond/team/ and set `photo`; until then an
 * initials placeholder shows. Never substitute stock or generated faces.
 */
export type TeamMember = {
  name: string
  role: string
  bio: string
  /** Segment colour in the accent bar and the portrait ring. */
  accent: string
  photo?: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Jackson Peter',
    role: 'Founder & MD, Bond Group',
    bio: 'Jackson Peter is an award-winning adventure entrepreneur, ocean conservation advocate, and Managing Director of the Bond Group of Companies. He leads pioneering ventures in scuba diving, marine tourism, adventure sports, and ocean education across India. His mission focuses on advancing UN Sustainable Development Goals through sustainable tourism, creating one million Ocean Ambassadors, generating 100,000 direct employment opportunities and 1,000,000 indirect jobs, while building globally respected marine adventure and conservation ecosystems.',
    accent: '#10C8C4',
    photo: '/images/bond/team/jackson-peter.webp',
  },
  {
    name: 'Kishor Kumar',
    role: 'Co-Founder & Director, Marketing',
    bio: 'Entrepreneur and business strategist with 20+ years of experience across FMCG, telecom, and international business development. Formerly associated with Samsung and Nokia, now leading tourism and blue economy ventures focused on sustainable growth and innovation.',
    accent: '#F5A623',
    photo: '/images/bond/team/kishor-kumar.webp',
  },
  {
    name: 'Suraj Khan',
    role: 'Co-Founder & Director, Sales',
    bio: 'Founder of Suraj Khan Photography, Co-Founder & Vice President (India) of South Asian Travel Awards, and Founder & Secretary General of Indian Ocean Divers Association. Entrepreneur and management professional leading marine tourism, photography, and sustainability initiatives, with active roles in tourism development, ocean conservation, and business leadership.',
    accent: '#B35AC7',
    photo: '/images/bond/team/suraj-khan.webp',
  },
  {
    name: 'Shyamkumar Balakrishnan',
    role: 'Co-Founder & Director, Finance',
    bio: 'Entrepreneur and senior business executive with over 25 years of leadership experience in establishing and managing businesses across India and East Africa. Brings extensive experience in business strategy, operations, finance, sales, and project management across diverse sectors including consulting, business development, skill development and training, construction, and tourism ventures.',
    accent: '#EF5350',
    photo: '/images/bond/team/shyamkumar-balakrishnan.webp',
  },
]

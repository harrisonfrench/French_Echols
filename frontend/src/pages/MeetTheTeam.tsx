import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ExternalLink, Mail } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  bio: string
  skills: string[]
  social: {
    linkedin?: string
    github?: string
    email?: string
  }
  initials: string
  accentColor: string
}

const team: TeamMember[] = [
  {
    name: 'Aiden Echols',
    role: 'Co-Founder',
    bio: 'MBA candidate at Georgia College & State University (3.8 GPA) in Management Information Systems with a Computer Science minor. Co-founded PocketAce LLC — an AI platform that auto-generates deadline calendars from college syllabi. Works as a Direct AI Representative at ThreadKore, engineering prompts that streamline complex homebuilder workflows. Holds edX certifications in Generative AI and Prompt Engineering. At Echols & French, Aiden leads technical architecture and AI strategy.',
    skills: ['Go', 'React', 'TypeScript', 'MySQL', 'Docker', 'AWS', 'Prompt Engineering', 'AI/ML', 'Java', 'SAP S/4HANA'],
    social: {
      email: 'aidenechols12@gmail.com',
    },
    initials: 'AE',
    accentColor: '#2563eb',
  },
  {
    name: 'Harrison French',
    role: 'Co-Founder',
    bio: 'More details coming soon.',
    skills: [],
    social: {},
    initials: 'HF',
    accentColor: '#7c3aed',
  },
  {
    name: 'Charles (Chase) Williamson',
    role: 'Co-Founder',
    bio: 'More details coming soon.',
    skills: [],
    social: {},
    initials: 'CW',
    accentColor: '#0891b2',
  },
]

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
      {/* Avatar */}
      <div className="flex items-center justify-center pt-14 pb-8">
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg"
          style={{ background: member.accentColor }}
        >
          {member.initials}
        </div>
      </div>

      {/* Info */}
      <div className="px-10 pb-10 flex flex-col flex-1">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-foreground">{member.name}</h3>
          <p
            className="text-base font-medium mt-2"
            style={{ color: member.accentColor }}
          >
            {member.role}
          </p>
        </div>

        {member.bio && (
          <p className="text-base text-muted-foreground leading-relaxed text-center mb-8">
            {member.bio}
          </p>
        )}

        {member.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm font-medium px-4 py-1.5 rounded-full bg-secondary text-muted-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Social links */}
        {(member.social.linkedin || member.social.github || member.social.email) && (
          <div className="flex items-center justify-center gap-6 mt-auto pt-6 border-t border-border">
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn
              </a>
            )}
            {member.social.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            )}
            {member.social.email && (
              <a
                href={`mailto:${member.social.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function MeetTheTeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              The People Behind The Work
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-6">
              Meet The Team
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a small, focused team based in Milledgeville, Georgia — obsessed with building
              websites and AI tools that actually move the needle for local businesses.
            </p>
          </div>
        </section>

        {/* Team grid — 1 column on mobile, 2 on tablet+, max 3 on large screens */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

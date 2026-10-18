// Real, shipped work. Every entry here was built end to end by urelimitless.
// Edit freely: the Projects section renders straight from this list.

export type Project = {
  id: string
  name: string
  orderNo: string
  requested: string
  built: string
  tools: string[]
  people: string
  year: string
  live?: string
  source?: string
  status: 'delivered' | 'in beta'
}

export const projects: Project[] = [
  {
    id: 'ringleader',
    name: 'Ringleader',
    orderNo: '01',
    requested: 'A fraud investigator that finds the whole ring from one suspicious account and explains every link.',
    built:
      'A graph investigator on FalkorDB. One account in, the ring out: shared devices, phones, cards and IPs walked up to three hops, a verdict with the shortest identifier chain for every implicated account, and proposed freezes that a human approves by name before anything changes.',
    tools: ['FalkorDB', 'Gemini', 'FastAPI', 'Cypher'],
    people: 'Backend and graph engineer, agent designer',
    year: '2026',
    live: 'https://ringleader.urelimitless.com',
    source: 'https://github.com/Okorodavid/ringleader',
    status: 'delivered',
  },
  {
    id: 'stash',
    name: 'Stash',
    orderNo: '02',
    requested: 'A dollar savings app that a stolen key cannot drain.',
    built:
      'Per-user vaults with a daily allowance that refills gradually, timelocked large withdrawals, guardians who can cancel or freeze, and an exit page that works even if the company disappears. Contracts live on Tempo and Base mainnet; a Next.js PWA on top.',
    tools: ['Foundry', 'Solidity', 'Next.js', 'Morpho', 'Privy'],
    people: 'Smart-contract engineer, product designer',
    year: '2026',
    status: 'in beta',
  },
  {
    id: 'conviction',
    name: 'Conviction',
    orderNo: '03',
    requested: 'Social trading for tokenized stocks, with a track record nobody can fake.',
    built:
      'Every position public, every fill a post, any trader copied with one tap at a size you set. Performance is reconstructed from the fills themselves and tied to a Base wallet. Smart-wallet sign-in, demo portfolios, a live feed simulator for demos.',
    tools: ['Next.js', 'Prisma', 'Base', 'Coinbase Smart Wallet'],
    people: 'Full-stack engineer, designer',
    year: '2026',
    status: 'delivered',
  },
  {
    id: 'cadence',
    name: 'Cadence',
    orderNo: '04',
    requested: 'An AI influencer and YouTube operation that runs on a schedule, not a generate button.',
    built:
      'Set a character and a cadence (one short a day, three UGC ads a week) and a job system fills the calendar with finished cuts to approve. Every image and video goes through the Higgsfield API; a worker renders the queue with ffmpeg.',
    tools: ['Higgsfield API', 'Next.js', 'ffmpeg', 'Prisma'],
    people: 'AI pipeline engineer, video editor',
    year: '2026',
    status: 'delivered',
  },
  {
    id: 'mybots',
    name: 'My Bots',
    orderNo: '05',
    requested: 'Always-on bots you can hand real work to, with a human gate on anything risky.',
    built:
      'Named bots with their own memory and workspace, a chat where you give them tasks, an approval gate for risky tools (allow once, always, deny, never), routines on a timer, and a browser per bot so they can open pages, read, click and type. Live transcript over SSE.',
    tools: ['Node 22', 'SQLite', 'Playwright', 'Gemini'],
    people: 'Agent engineer',
    year: '2026',
    status: 'delivered',
  },
]

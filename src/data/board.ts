// The hero patch bay. Columns of jacks and the calls that patch through them.
// Companies are kinds of company we serve; tools are what we wire; people are who we send.

export const companies = ['Logistics company', 'Clinic', 'Retail brand', 'Law firm', 'Fintech startup']

export const tools = ['Claude', 'Gemini', 'n8n', 'Playwright', 'FalkorDB', 'Higgsfield', 'Supabase']

export const people = ['Agent engineer', 'Data analyst', 'Automation engineer', 'Product designer', 'Video editor']

export type Call = { company: number; tool: number; person: number; need: string }

// One call per company, in the order they patch through on the board.
export const calls: Call[] = [
  { company: 0, tool: 0, person: 0, need: 'Answer customer email in our tone, a human approves refunds' },
  { company: 1, tool: 1, person: 1, need: 'Summarise intake forms and flag missing records' },
  { company: 2, tool: 5, person: 4, need: 'Three product videos a week, same presenter every time' },
  { company: 3, tool: 2, person: 2, need: 'Route new matters to the right partner automatically' },
  { company: 4, tool: 4, person: 0, need: 'Find the whole fraud ring from one flagged account' },
]

// Engraved labels that scroll on the tools strip.
export const toolStrip = [
  'Claude',
  'Gemini',
  'OpenAI',
  'n8n',
  'Zapier',
  'Make',
  'Playwright',
  'FalkorDB',
  'Supabase',
  'Postgres',
  'Vercel',
  'Higgsfield',
  'ElevenLabs',
  'Telegram bots',
  'Slack apps',
  'Gmail API',
  'Notion',
  'Airtable',
  'Foundry',
  'Next.js',
]

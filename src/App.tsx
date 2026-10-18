import { Calls } from './components/Calls'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Lines } from './components/Lines'
import { RingUs } from './components/RingUs'
import { ToolStrip } from './components/ToolStrip'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-amber focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ToolStrip />
        <Lines />
        <HowItWorks />
        <Calls />
        <RingUs />
      </main>
      <Footer />
    </>
  )
}

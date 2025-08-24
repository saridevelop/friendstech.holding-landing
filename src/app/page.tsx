import Header from '@/components/Header'
import LogoBar from '@/components/LogoBar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Approach from '@/components/Approach'
import Blog from '@/components/Blog'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <LogoBar />
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <Projects />
      </main>
      <Approach />
      <main className="container mx-auto px-4 py-8">
        <Blog />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

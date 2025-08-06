import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <Projects />
        <Blog />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

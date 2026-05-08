import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import History from '@/components/History';
import Pastors from '@/components/Pastors';
import SisterChurches from '@/components/SisterChurches';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <History />
      <Pastors />
      <SisterChurches />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
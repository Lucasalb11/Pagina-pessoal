import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/About";
import TrackRecord from "@/components/Experience";
import Shipped from "@/components/Projects";
import Credentials from "@/components/Education";
import Signal from "@/components/Signal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Grain from "@/components/system/Grain";

const Index = () => (
  <div className="min-h-screen relative">
    <Grain />
    <Navbar />
    <Hero />
    <Shipped />
    <TrackRecord />
    <Story />
    <Signal />
    <Credentials />
    <Contact />
    <Footer />
  </div>
);

export default Index;

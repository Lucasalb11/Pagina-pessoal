import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/About";
import TrackRecord from "@/components/Experience";
import Shipped from "@/components/Projects";
import Pillars from "@/components/Skills";
import Credentials from "@/components/Education";
import Signal from "@/components/Signal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/fx/CustomCursor";
import Grain from "@/components/system/Grain";
import VisitorGuide from "@/components/VisitorGuide";

const Index = () => (
  <div className="min-h-screen relative">
    <CustomCursor />
    <Grain />
    <Navbar />
    <Hero />
    <Story />
    <TrackRecord />
    <Shipped />
    <Pillars />
    <Credentials />
    <Signal />
    <Contact />
    <Footer />
    <VisitorGuide />
  </div>
);

export default Index;

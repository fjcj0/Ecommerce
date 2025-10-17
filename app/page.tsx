import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import NewCollection from "./components/NewCollection";
import OurWork from "./components/OurWork";
export default function Page() {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <Home />
      <NewCollection />
      <About />
      <OurWork />
      <Contact />
      <Footer />
    </div>
  );
}
import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import NewCollection from "./components/NewCollection";
export default function Page() {
  return (
    <div className="min-h-[100vh]">
      <Header />
      <Home />
      <NewCollection />
      <About />
    </div>
  );
}
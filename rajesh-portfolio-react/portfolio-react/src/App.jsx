import { useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MeditatingFigure from "./components/MeditatingFigure";
import useScrollReveal from "./hooks/useScrollReveal";

export default function App() {
  const portRef = useRef(null);
  useScrollReveal();

  return (
    <>
      <Navbar />
      <Hero portRef={portRef} />

      <div id="port" ref={portRef}>
        <About />
        <div className="sep" />
        <Projects />
        <div className="sep" />
        <Skills />
        <div className="sep" />
        <Contact />
      </div>

      <MeditatingFigure />
      <Footer />
    </>
  );
}

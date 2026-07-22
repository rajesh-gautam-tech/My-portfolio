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
import CursorGlow from "./components/CursorGlow";
import useScrollReveal from "./hooks/useScrollReveal";
import useTiltCards from "./hooks/useTiltCards";

export default function App() {
  const portRef = useRef(null);
  useScrollReveal();
  useTiltCards(".pc, .tc");

  return (
    <>
      <CursorGlow />
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
import TopNavbar from "../Nav/TopNavbar";
import Header from "../Sections/Header";
import Projects from "../Sections/Projects";
import Services from "../Sections/Services";
import Footer from "../Sections/Footer";
import { FloatingButtons } from "../Buttons/FloatingButton";
// import { useLocation } from "react-router-dom";

export default function HomePage() {
  // const locaton = useLocation();
  return (
    <>
      <TopNavbar />
      <Header />
      <Projects />
      <Services />
      <FloatingButtons />
      <Footer />
    </>
  );
}

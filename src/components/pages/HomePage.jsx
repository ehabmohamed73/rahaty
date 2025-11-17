import TopNavbar from "../Nav/TopNavbar";
import Header from "../Sections/Header";
import Projects from "../Sections/Projects";
import Services from "../Sections/Services";
import Footer from "../Sections/Footer";
import { FloatingButtons } from "../Buttons/FloatingButton";
export default function HomePage() {
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

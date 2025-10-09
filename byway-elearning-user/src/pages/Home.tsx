import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Categories } from "../components/Categories";
import { Courses } from "../components/Courses";
import { Instructors } from "../components/Instructors";
import { Testimonials } from "../components/Testimonials";
import { BecomeInstructor } from "../components/BecomeInstructor";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
      <Courses />
      <Instructors />
      <Testimonials />
      <BecomeInstructor />
      <Footer />
    </div>
  );
}

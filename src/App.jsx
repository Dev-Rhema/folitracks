import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <main className="flex flex-col pt-16">
        
        <Routes>
          <Route
            path="/"
            element={<Home onContactClick={() => setIsContactModalOpen(true)} />}
          />
          <Route
            path="/about"
            element={<About onContactClick={() => setIsContactModalOpen(true)} />}
          />
          <Route
            path="/services"
            element={<Services onContactClick={() => setIsContactModalOpen(true)} />}
          />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

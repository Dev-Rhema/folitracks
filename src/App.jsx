import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => setIsContactModalOpen(true);

  return (
    <>
      <Navbar onContactClick={handleContactClick} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <main className="flex flex-col pt-16">
        <Outlet context={{ onContactClick: handleContactClick }} />
      </main>
    </>
  );
}

export default App;

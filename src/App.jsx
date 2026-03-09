import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import ContactModal from "./components/ContactModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        // draggable
        pauseOnHover
      />
    </>
  );
}

export default App;

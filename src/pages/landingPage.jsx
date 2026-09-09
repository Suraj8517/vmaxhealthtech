import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogoLoader from "../components/Helper/LogoLoader";
import Home from "./Home";
import About from "./About";
import Team from "./Team";
import OurProductsPage from "./ourproducts";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import TermsAndConditions from "./termsandcondition";
import RefundPolicy from "./refundPolicy";
import PrivacyPolicy from "./privacypolicy";


function App() {
  const [loaderDone, setLoaderDone] = useState(() => {
    return sessionStorage.getItem("loaderShown") === "true";
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("loaderShown", "true");
    setLoaderDone(true);
  };

  return (
    <BrowserRouter>
      {!loaderDone && (
        <LogoLoader onComplete={handleLoaderComplete} />
      )}

      {loaderDone && (
        <>
        
<Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
       <Route path="/team" element={<Team />} />
       <Route path="/our-products" element={<OurProductsPage />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                            <Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
          <Footer/>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
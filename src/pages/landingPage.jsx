import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogoLoader from "../components/Helper/LogoLoader";
import Home from "./Home";
import About from "./About";


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
        

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
       
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;

import './App.css'
import LogoLoader from './components/Helper/LogoLoader'
import LandingPage from './pages/landingPage'
import { useState } from 'react';
function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
    <LandingPage loaderDone={loaderDone}/>
    </>
  )
}

export default App

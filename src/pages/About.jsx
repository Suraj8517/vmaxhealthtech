import React from 'react'
import AboutHero from '../components/About/heroSection'
import AboutHeroSecondSection from '../components/About/HeroSecondSection'
import SomeSection from '../components/About/someSection'
import Hero from '../components/About/AboutHero'
import AboutHeroSection from '../components/About/AboutHeroSecondSection'
import CustomerSection from '../components/About/AboutCustomerJourney'
import MissionVision from '../components/About/AboutUsMissionVisionSection'
import WhatWeDo from '../components/About/whatWeDo'
import Brands from '../components/About/AboutOurBrand'

function About() {
  return (
    <div>
      <Hero/>
      <AboutHeroSection/>
         <MissionVision/>
      <CustomerSection/>
      <WhatWeDo/>
      <Brands/>
    </div>
  )
}

export default About

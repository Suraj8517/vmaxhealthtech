import React from 'react'
import Hero from '../components/Home/HeroSection'
import HeroSecondSection from '../components/Home/HeroSecondSection'
import FeaturesSection from '../components/Home/FeaturesSection'
import WhyUs from '../components/Home/WhyUs'
import CTA from '../components/Home/CTASection'
import Testimonial from '../components/Home/Testimonial'

export default function Home() {
  return (
    <div>
      <Hero/>
      <HeroSecondSection/>
      <FeaturesSection/>
      <WhyUs/>
      <CTA/>
    </div>
  )
}

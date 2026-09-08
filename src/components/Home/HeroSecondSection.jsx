import React, { useRef } from 'react'
import AuroraText from '../Helper/AuroraText'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function ScrollBlurText({ text }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.55'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 22,
    mass: 0.6,
    restDelta: 0.001,
  })

  const words = text.split(' ')

  return (
    <div
      ref={containerRef}
      className='relative text-xl sm:text-3xl lg:text-[6vh] leading-8 sm:leading-10 lg:leading-15'
    >
      <h2 className='text-white opacity-8'>
        {words.map((word, i) => (
          <span key={i} className='inline-block mr-[0.3em]'>
            {word}
          </span>
        ))}
      </h2>

      <h2 className='absolute inset-0 text-white'>
        {words.map((word, i) => {
          const start = (i / words.length) * 0.75
          const end = start + 2.2 / words.length
          return (
            <Word key={i} progress={smoothProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </h2>
    </div>
  )
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0, 1], { clamp: true })
  const blur = useTransform(progress, range, [12, 0], { clamp: true })
  const y = useTransform(progress, range, [8, 0], { clamp: true })
  const scale = useTransform(progress, range, [0.97, 1], { clamp: true })
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.span
      style={{ opacity, filter, y, scale }}
      className='inline-block mr-[0.3em] will-change-[filter,opacity,transform]'
    >
      {children}
    </motion.span>
  )
}

function HeroSecondSection() {
  return (
    <section className='min-h-fit sm:h-[90vh] mx-4 sm:mx-6 py-5 sm:py-6 lg:py-15 flex items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-12 px-4 sm:px-6 lg:px-16'>
        <h2 className='font-sans font-light text-white text-xl sm:text-3xl lg:text-4xl max-w-full sm:max-w-xs'>
          <AuroraText>Empowering Wellness Through Intelligent Solutions</AuroraText>
        </h2>

        <ScrollBlurText text="Our AI-powered platform isn't just about technology; it's about empowering you to achieve your health and wellness goals with greater ease and effectiveness. Experience the future of wellness and discover how our AI can transform your journey today." />
      </div>
    </section>
  )
}

export default HeroSecondSection
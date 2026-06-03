import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import cover from '/cover.png'
import './Hero.css'

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  // Parallax: image drifts up as user scrolls down
  const imgY = useTransform(scrollYProgress, [0, 1], ['0px', '140px'])
  // Content fades out as user scrolls away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], ['0px', '-40px'])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__bg">
        <motion.img
          src={cover}
          alt="JMEL Modular Cabinet"
          className="hero__cover"
          style={{ y: imgY }}
        />
        <div className="hero__overlay" />
      </div>

      <motion.div
        className="hero__content"
        style={{ opacity: contentOpacity, y: contentY }}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__tagline" variants={itemVariants}>
          Transforming Spaces with Smart Modular Cabinet Solutions.
        </motion.p>

        <motion.h1 className="hero__title" variants={itemVariants}>
          JMEL Modular Cabinet
        </motion.h1>

        <motion.p className="hero__subtitle" variants={itemVariants}>
          Custom modular cabinets designed for your space — built with precision, delivered with care.
        </motion.p>

        <motion.div className="hero__actions" variants={itemVariants}>
          <motion.button
            className="btn btn--primary"
            onClick={() => scrollTo('services')}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 28px rgba(107,58,42,0.55)' }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            View Our Work
          </motion.button>
          <motion.button
            className="btn btn--outline"
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            Get a Quote
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll-indicator"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className="hero__scroll-dot"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <ChevronDown />
      </motion.button>
    </section>
  )
}

function ChevronDown() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import logo from '/logo.png'
import './Footer.css'

const brandVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 240, damping: 24 },
  },
}

const navContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
}

const navLinkVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 26 },
  },
}

const bottomVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__inner">
        <motion.div
          className="footer__brand"
          variants={brandVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.img
            src={logo}
            alt="JMEL Logo"
            className="footer__logo"
            whileHover={{ scale: 1.12, rotate: 8 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 360, damping: 20 }}
          />
          <motion.p
            className="footer__tagline"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Transforming Spaces with Smart Modular Cabinet Solutions.
          </motion.p>
        </motion.div>

        <motion.nav
          className="footer__nav"
          variants={navContainerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {['home', 'about', 'services', 'gallery', 'contact'].map((id) => (
            <motion.button
              key={id}
              className="footer__link"
              onClick={() => scrollTo(id)}
              variants={navLinkVariants}
              whileHover={{
                scale: 1.08,
                color: '#ffffff',
                backgroundColor: 'rgba(255,255,255,0.12)',
                transition: { type: 'spring', stiffness: 400, damping: 22 },
              }}
              whileTap={{ scale: 0.92 }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </motion.button>
          ))}
        </motion.nav>
      </div>

      <motion.div
        className="footer__bottom"
        variants={bottomVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <p>© {new Date().getFullYear()} JMEL Modular Cabinet. All rights reserved.</p>
      </motion.div>
    </footer>
  )
}

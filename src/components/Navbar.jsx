import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import logo from '/logo.png'
import './Navbar.css'

const NAV_LINKS = ['Home', 'About', 'Services', 'Gallery', 'Contact']

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.22, ease: 'easeIn' } },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.32, ease: 'easeOut', staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.22, ease: 'easeIn' } },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 350, damping: 28 } },
  exit: { opacity: 0, x: -18, transition: { duration: 0.15 } },
}

export default function Navbar({ theme, toggleTheme }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 60))
    return unsub
  }, [scrollY])

  const handleNav = (link) => {
    setMenuOpen(false)
    const el = document.getElementById(link.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className="navbar__inner">
        <motion.div
          className="navbar__brand"
          onClick={() => handleNav('Home')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <img src={logo} alt="JMEL Logo" className="navbar__logo" />
          <span className="navbar__name">JMEL Modular Cabinet</span>
        </motion.div>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li
              key={link}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <motion.button
                className="navbar__link"
                onClick={() => handleNav(link)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {link}
              </motion.button>

              {/* Sliding underline indicator — shares one layoutId so it glides between links */}
              {hoveredLink === link && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    left: '15%',
                    right: '15%',
                    height: 2,
                    background: 'var(--brown, #6B3A2A)',
                    borderRadius: 2,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 34 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__controls">
          <motion.button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.15, rotate: 20 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </motion.button>

          <motion.button
            className="navbar__burger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.88 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="navbar__mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link} variants={mobileLinkVariants}>
                <button className="navbar__mobile-link" onClick={() => handleNav(link)}>
                  {link}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

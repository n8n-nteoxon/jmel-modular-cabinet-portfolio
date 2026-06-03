import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import logo from '/logo.png'
import './About.css'

const stats = [
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

function AnimatedCounter({ value, suffix, label, inView }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.8, ease: 'easeOut' })
    return controls.stop
  }, [inView, count, value])

  return (
    <div className="about__stat">
      <span className="about__stat-value">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
      <span className="about__stat-label">{label}</span>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about__inner">
        <motion.div
          className="about__image-wrap"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          <img src={logo} alt="JMEL Modular Cabinet" className="about__logo" />
          <motion.div
            className="about__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.35 }}
          >
            Est. in the Philippines
          </motion.div>
        </motion.div>

        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
        >
          <p className="section__label">Who We Are</p>
          <h2 className="section__title">Crafting Spaces with Purpose</h2>
          <p className="about__desc">
            JMEL Modular Cabinet is a trusted provider of custom-built modular cabinetry in the Philippines.
            We specialize in designing and manufacturing high-quality cabinets that combine functionality,
            beauty, and durability — tailored to fit your home or office perfectly.
          </p>
          <p className="about__desc">
            From kitchen cabinets to bedroom wardrobes and office storage, our skilled craftsmen use
            premium materials to bring your vision to life — on time and within budget.
          </p>

          <div className="about__stats">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  inView={inView}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

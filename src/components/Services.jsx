import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Services.css'

const services = [
  {
    Icon: KitchenIcon,
    title: 'Kitchen Cabinets',
    desc: "Custom kitchen cabinetry designed to maximize storage and complement your kitchen's aesthetics.",
  },
  {
    Icon: WardrobeIcon,
    title: 'Bedroom Wardrobes',
    desc: 'Elegant built-in wardrobes and closets tailored to your bedroom layout and storage needs.',
  },
  {
    Icon: BathroomIcon,
    title: 'Bathroom Vanities',
    desc: 'Moisture-resistant bathroom cabinets and vanities built for durability and style.',
  },
  {
    Icon: OfficeIcon,
    title: 'Office Storage',
    desc: 'Functional office cabinets, bookshelves, and storage units for a productive workspace.',
  },
  {
    Icon: LivingRoomIcon,
    title: 'Living Room Units',
    desc: 'TV cabinets, display shelves, and entertainment units crafted to elevate your living room.',
  },
  {
    Icon: CustomIcon,
    title: 'Custom Design',
    desc: 'Have a unique vision? We work with you from concept to completion for fully custom pieces.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 240, damping: 22 },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="services" ref={ref}>
      <div className="services__inner">
        <motion.div
          className="services__header"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="section__label">What We Offer</p>
          <h2 className="section__title">Our Services</h2>
          <p className="services__sub">
            We provide end-to-end modular cabinet solutions — from design and fabrication to installation.
          </p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {services.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              className="service-card"
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 44px rgba(107,58,42,0.16)',
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="service-card__icon">
                <Icon />
              </div>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* SVG Icons — consistent 28×28 stroke style */

function KitchenIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
      <line x1="12" y1="10" x2="12" y2="21"/>
      <circle cx="7" cy="6.5" r="1"/>
      <circle cx="17" cy="6.5" r="1"/>
    </svg>
  )
}

function WardrobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <line x1="12" y1="2" x2="12" y2="22"/>
      <circle cx="9" cy="12" r="1"/>
      <circle cx="15" cy="12" r="1"/>
      <line x1="2" y1="19" x2="22" y2="19"/>
    </svg>
  )
}

function BathroomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="9" rx="2"/>
      <path d="M7 11V6a2 2 0 0 1 4 0v1"/>
      <line x1="3" y1="20" x2="3" y2="22"/>
      <line x1="21" y1="20" x2="21" y2="22"/>
      <line x1="8" y1="16" x2="8" y2="16.01"/>
      <line x1="16" y1="16" x2="16" y2="16.01"/>
    </svg>
  )
}

function OfficeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="2" y1="9" x2="22" y2="9"/>
      <line x1="2" y1="14" x2="22" y2="14"/>
      <line x1="8" y1="17" x2="8" y2="21"/>
      <line x1="16" y1="17" x2="16" y2="21"/>
      <line x1="5" y1="21" x2="19" y2="21"/>
    </svg>
  )
}

function LivingRoomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="12" rx="2"/>
      <rect x="5" y="8" width="14" height="6" rx="1"/>
      <line x1="2" y1="17" x2="22" y2="17"/>
      <line x1="5" y1="17" x2="5" y2="21"/>
      <line x1="19" y1="17" x2="19" y2="21"/>
    </svg>
  )
}

function CustomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )
}

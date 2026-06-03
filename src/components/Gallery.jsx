import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import cover from '/cover.png'
import logo from '/logo.png'
import './Gallery.css'

const items = [
  { img: cover, label: 'Kitchen Design' },
  { img: logo, label: 'Our Brand' },
  { img: cover, label: 'Modern Cabinet' },
  { img: cover, label: 'Custom Wardrobe' },
  { img: logo, label: 'JMEL Quality' },
  { img: cover, label: 'Office Storage' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
}

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected === null) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="gallery" className="gallery" ref={ref}>
      <div className="gallery__inner">
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section__label">Our Portfolio</p>
          <h2 className="section__title">Gallery</h2>
          <p className="gallery__sub">A glimpse of our craftsmanship — every piece built with care.</p>
        </motion.div>

        <motion.div
          className="gallery__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="gallery__item"
              variants={itemVariants}
              whileHover={{
                scale: 1.04,
                transition: { type: 'spring', stiffness: 320, damping: 22 },
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(i)}
              /* Dim selected item so the lightbox "takes" it visually */
              animate={selected === i ? { opacity: 0.55 } : { opacity: 1 }}
            >
              {/* layoutId pairs this thumbnail with the lightbox image */}
              <motion.img
                layoutId={`gallery-img-${i}`}
                src={item.img}
                alt={item.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <motion.div
                className="gallery__label"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.22 }}
              >
                {item.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="gallery__note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          * Add your actual project photos to the <code>public/</code> folder to replace placeholders.
        </motion.p>
      </div>

      {/* Lightbox — layoutId on the image creates the shared-element morph */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="gallery__lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.y) > 90) setSelected(null) }}
            >
              {/* Same layoutId as the grid thumbnail — Framer Motion morphs between the two */}
              <motion.img
                layoutId={`gallery-img-${selected}`}
                src={items[selected].img}
                alt={items[selected].label}
                className="gallery__lightbox-img"
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              />

              <div className="gallery__lightbox-footer">
                <span className="gallery__lightbox-label">{items[selected].label}</span>
                <span className="gallery__lightbox-hint">Drag or press Esc to close</span>
              </div>

              <button
                className="gallery__lightbox-nav gallery__lightbox-nav--prev"
                onClick={() => setSelected((selected - 1 + items.length) % items.length)}
                aria-label="Previous"
              >
                <ChevronLeft />
              </button>
              <button
                className="gallery__lightbox-nav gallery__lightbox-nav--next"
                onClick={() => setSelected((selected + 1) % items.length)}
                aria-label="Next"
              >
                <ChevronRight />
              </button>

              <motion.button
                className="gallery__lightbox-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.88 }}
              >
                <CloseIcon />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

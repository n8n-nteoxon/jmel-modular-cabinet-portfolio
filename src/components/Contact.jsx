import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './Contact.css'

const info = [
  {
    Icon: MapPinIcon,
    label: 'Address',
    value: 'Marikina City, Philippines',
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    value: '+63 995 088 8033',
  },
  {
    Icon: MailIcon,
    label: 'Email',
    value: 'teoxon0207@gmail.com',
  },
  {
    Icon: ClockIcon,
    label: 'Hours',
    value: 'Mon – Sat: 8AM – 6PM',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__inner">
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          <p className="section__label">Reach Out</p>
          <h2 className="section__title">Get in Touch</h2>
          <p className="contact__desc">
            Ready to transform your space? Contact us for a free consultation and quotation.
          </p>

          <div className="contact__details">
            {info.map(({ Icon, label, value }, i) => (
              <motion.div
                key={label}
                className="contact__detail"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 260, damping: 24 }}
              >
                <div className="contact__detail-icon">
                  <Icon />
                </div>
                <div>
                  <span className="contact__detail-label">{label}</span>
                  <span className="contact__detail-value">{value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className="contact__success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <motion.div
                  className="contact__success-icon"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.15 }}
                >
                  <CheckIcon />
                </motion.div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="contact__form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form__row">
                  <div className="form__group">
                    <label>Full Name</label>
                    <motion.input
                      type="text"
                      placeholder="Juan dela Cruz"
                      required
                      whileFocus={{ borderColor: '#6B3A2A', scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  </div>
                  <div className="form__group">
                    <label>Phone Number</label>
                    <motion.input
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      whileFocus={{ borderColor: '#6B3A2A', scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label>Email Address</label>
                  <motion.input
                    type="email"
                    placeholder="you@email.com"
                    required
                    whileFocus={{ borderColor: '#6B3A2A', scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                </div>
                <div className="form__group">
                  <label>Service Needed</label>
                  <select>
                    <option value="">Select a service...</option>
                    <option>Kitchen Cabinets</option>
                    <option>Bedroom Wardrobes</option>
                    <option>Bathroom Vanities</option>
                    <option>Office Storage</option>
                    <option>Living Room Units</option>
                    <option>Custom Design</option>
                  </select>
                </div>
                <div className="form__group">
                  <label>Message</label>
                  <motion.textarea
                    rows="4"
                    placeholder="Tell us about your project..."
                    required
                    whileFocus={{ borderColor: '#6B3A2A' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                </div>
                <div className="form__group">
                  <label>
                    Floor Plan / Reference File{' '}
                    <span className="form__optional">(optional)</span>
                  </label>
                  <label className="file-upload">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf,.dwf"
                      onChange={(e) => setFile(e.target.files[0] || null)}
                      className="file-upload__input"
                    />
                    <span className="file-upload__btn">
                      <UploadIcon />
                      {file ? file.name : 'Attach floor plan or design file'}
                    </span>
                    <span className="file-upload__hint">JPG, PNG, PDF, DWG, DXF — max 20MB</span>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.03, boxShadow: '0 8px 28px rgba(107,58,42,0.45)' } : {}}
                  whileTap={!loading ? { scale: 0.96 } : {}}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.span
                        key="loading"
                        className="btn__spinner"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

/* SVG Icons */

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

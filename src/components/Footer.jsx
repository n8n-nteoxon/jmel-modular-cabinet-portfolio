import logo from '/logo.png'
import './Footer.css'

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="JMEL Logo" className="footer__logo" />
          <p className="footer__tagline">Transforming Spaces with Smart Modular Cabinet Solutions.</p>
        </div>

        <nav className="footer__nav">
          {['home', 'about', 'services', 'gallery', 'contact'].map((id) => (
            <button key={id} className="footer__link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} JMEL Modular Cabinet. All rights reserved.</p>
      </div>
    </footer>
  )
}

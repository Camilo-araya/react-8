import React from 'react';
import '../assets/style/Footer.css'; 

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="copyright">
          © {new Date().getFullYear()} Pizzería Il Nino Totoli. Todos los derechos reservados.
        </p>
        <nav className="footer-nav">
          <ul className="footer-links">
            <li className="footer-link-item">
              <a href="/terminos" className="footer-link">
                Términos de Servicio
              </a>
            </li>
            <li className="footer-link-item">
              <a href="/privacidad" className="footer-link">
                Política de Privacidad
              </a>
            </li>
            <li className="footer-link-item">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
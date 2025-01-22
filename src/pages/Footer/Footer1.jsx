import "./Footer1.css";
import keventLogo from "../../assets/kevent-logo.svg";

const Footer = () => {
  return (
    <footer className="footer1">
      <div className="footer-container1">
        <div className="footer-top1">
          <div className="footer-logo1">
            <a href="/" className="footer-logo-link1">
              <img src={keventLogo} className="footer-logo-image1" alt="Kevent Logo" />
              <span className="footer-logo-text1">Kevent</span>
            </a>
            <ul className="footer-list1">
              <li>
                <a href="/about" className="about-link1">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links1">
            <div>
              <h2 className="footer-heading1">Resources</h2>
              <ul className="footer-list1">
                <li>
                  <a href="/resources" className="footer-link1">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/support" className="footer-link1">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="footer-heading1">Follow Us</h2>
              <ul className="footer-list1">
                <li>
                  <a href="https://github.com/kevent" className="footer-link1">
                    Github
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="footer-heading1">Legal</h2>
              <ul className="footer-list1">
                <li>
                  <a href="/privacy-policy" className="footer-link1">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="footer-link1">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="footer-divider1" />

        <div className="footer-bottom1">
          <span className="footer-copyright1">
            © 2025{" "}
            <a href="/" className="footer-link1">
              Kevent™
            </a>
            . All Rights Reserved.
          </span>

          <div className="footer-social1">
            <a href="#" className="footer-social-icon" aria-label="Facebook page">
              <svg className="social-svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://github.com/kevent" className="footer-social-icon1" aria-label="GitHub page">
              <svg className="social-svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/kevent" className="footer-social-icon1" aria-label="Instagram page">
              <svg className="social-svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2.16c3.2 0 3.594.012 4.868.07 1.126.056 1.923.236 2.588.495.674.262 1.23.618 1.776 1.164.546.546.902 1.102 1.164 1.776.259.665.439 1.462.495 2.588.058 1.274.07 1.668.07 4.868s-.012 3.594-.07 4.868c-.056 1.126-.236 1.923-.495 2.588-.262.674-.618 1.23-1.164 1.776-.546.546-1.102.902-1.776 1.164-.665.259-1.462.439-2.588.495-1.274.058-1.668.07-4.868.07s-3.594-.012-4.868-.07c-1.126-.056-1.923-.236-2.588-.495-.674-.262-1.23-.618-1.776-1.164-.546-.546-.902-1.102-1.164-1.776-.259-.665-.439-1.462-.495-2.588-.058-1.274-.07-1.668-.07-4.868s.012-3.594.07-4.868c.056-1.126.236-1.923.495-2.588.262-.674.618-1.23 1.164-1.776.546-.546 1.102-.902 1.776-1.164.665-.259 1.462-.439 2.588-.495C8.406 2.172 8.8 2.16 12 2.16zm0 1.44c-3.06 0-3.42.01-4.626.066-1.118.054-1.662.238-2.05.418-.476.213-.804.541-1.027 1.027-.18.388-.364.933-.418 2.05-.056 1.206-.066 1.566-.066 4.626s.01 3.42.066 4.626c.054 1.118.238 1.662.418 2.05.213.476.541.804 1.027 1.027.388.18.933.364 2.05.418 1.206.056 1.566.066 4.626.066s3.42-.01 4.626-.066c1.118-.054 1.662-.238 2.05-.418.476-.213.804-.541 1.027-1.027.18-.388.364-.933.418-2.05.056-1.206.066-1.566.066-4.626s-.01-3.42-.066-4.626c-.054-1.118-.238-1.662-.418-2.05-.213-.476-.541-.804-1.027-1.027-.388-.18-.933-.364-2.05-.418C15.42 3.61 15.06 3.6 12 3.6zM12 6.564a5.436 5.436 0 1 0 0 10.872 5.436 5.436 0 0 0 0-10.872zm0 9.536a4.1 4.1 0 1 1 0-8.2 4.1 4.1 0 0 1 0 8.2zm6.245-7.18a1.144 1.144 0 1 0 0-2.289 1.144 1.144 0 0 0 0 2.289z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom"
// import Logo from "../images/logo.png"
import { FaLinkedin, FaFacebookF } from "react-icons/fa"
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai"

const Footer = () => {
  return (
    <footer>
      <div className="container footertocontainer">
        <article>
          <Link to="/" className="logo">
            {/* <img src={Logo} alt="Footer Logo" /> */}
          </Link>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Sit amet justo donec enim diam. Enim nulla aliquet porttitor lacus.
          </p>
          <div className="footertosocials">
            <a className="py-1 px-2" href="https://linkedin.com" target="_blank" rel="noreferrer noopener"><FaLinkedin /></a>
            <a className="py-1 px-2" href="https://facebook.com" target="_blank" rel="noreferrer noopener"><FaFacebookF /></a>
            <a className="py-1 px-2" href="https://twitter.com" target="_blank" rel="noreferrer noopener"><AiOutlineTwitter /></a>
            <a className="py-1 px-2" href="https://instagram.com" target="_blank" rel="noreferrer noopener"><AiFillInstagram /></a> 
          </div>
        </article>
        <article>
          <h4 className="fw-bold">Permalinks</h4>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/about">About</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/plans">Plans</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/trainers">Trainers</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/gallery">Gallery</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/contact">Contact</Link>
        </article>
        <article>
          <h4 className="fw-bold">Insight</h4>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/s">Blog</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/s">Case Studies</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/s">Events</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/s">Communities</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/s">FAQs</Link>
        </article>
        <article>
          <h4 className="fw-bold">Get In Touch</h4>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/contact">Contact Us</Link>
          <Link className="text-secondary" style={{fontFamily:'Space Mono', textDecoration:'none'}} to="/s">Support</Link>
        </article>
      </div>
      <div className="footertocopyright">
        <small>2023 TIIMCMY COP &copy; All Right Reserverd</small>
      </div>
    </footer>
  )
}

export default Footer

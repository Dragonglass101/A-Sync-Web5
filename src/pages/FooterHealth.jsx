import { Link } from "react-router-dom"
// import Logo from "../images/logo.png"
import { FaLinkedin, FaFacebookF } from "react-icons/fa"
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai"

import img_workout from "../assets/images/workoutIcon.png"
import img_health from "../assets/images/fruitpile.png"
import Image from "../assets/images/bowl1_ai.png"

const FooterHealth = () => {
  return (
    <footer>
      <div className="container footertocontainer">
        <article>
          {/* <Link className="logo"> */}
            <img src={Image} style={{height:'64px', width:'auto'}} alt="Footer Logo" />
          {/* </Link> */}
          <p>
            Design personalized training plans, and celebrate your achievements – all while safeguarding your privacy.
          </p>
          <div className="footertosocials">
            <a className="py-1 px-2" target="_blank" rel="noreferrer noopener"><FaLinkedin /></a>
            <a className="py-1 px-2" target="_blank" rel="noreferrer noopener"><FaFacebookF /></a>
            <a className="py-1 px-2" target="_blank" rel="noreferrer noopener"><AiOutlineTwitter /></a>
            <a className="py-1 px-2" target="_blank" rel="noreferrer noopener"><AiFillInstagram /></a>
          </div>
        </article>
        <article>
          <h4 className="fw-bold">Permalinks</h4>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }} >About</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Plans</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Trainers</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Gallery</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Contact</Link>
        </article>
        <article>
          <h4 className="fw-bold">Insight</h4>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Blog</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Case Studies</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Events</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Communities</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>FAQs</Link>
        </article>
        <article>
          <h4 className="fw-bold">Get In Touch</h4>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Contact Us</Link>
          <Link className="text-secondary" style={{ fontFamily: 'Space Mono', textDecoration: 'none' }}>Support</Link>
        </article>
      </div>
      <div className="footertocopyright">
      </div>
    </footer>
  )
}

export default FooterHealth

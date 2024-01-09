import { Link } from "react-router-dom"
// import Image from "../assets/images/skipping.svg"
// import Image from "../assets/images/chestPress.jpeg"
import Image from "../assets/images/chestPress2.png"

const MainHeader = () => {
  return (
    <div className="maintoheader">
      <div className="container maintoheader-container">
        <div className="maintoheader-left">
          {/* <h4>#100DaysOfWorkOut</h4> */}
          <h1 className="fw-bold">
            Own your <mark style={{color:'#c88500', tectDecoration:'none', background:'none'}}>movement</mark>,<br/> 
            Own your <mark style={{color:'#c88500', tectDecoration:'none', background:'none'}}>data</mark>
          </h1>
          <p className="text-secondary" style={{fontSize:'small'}}>
          
          Design personalized training plans, and celebrate your achievements – all while safeguarding your privacy. Your fitness, your rules. Move with Fitbit.
          </p>
          <Link to="/workout/create" className="bttn lg fw-bold" style={{textDecoration:'none', fontFamily:'Space Mono'}}>Get Started</Link>
        </div>
        <div className="maintoheader-right">
          <div className="maintoheader-circle"></div>
          <div className="maintoheader-image">
            <img width={400} src={Image} alt="Header Main Image" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHeader
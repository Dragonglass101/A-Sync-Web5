// import { FaCrown } from "react-icons/fa"
import { Link } from "react-router-dom"
// import { AiFillCaretRight } from "react-icons/ai"
import dumbleImg from "../assets/images/dumble.png"
import chestPressImg from "../assets/images/chestPress.jpeg"

const Programs = () => {
  return (
    <section className="programs">
      <div className="container programstocontainer">
        <div className="sectiontohead undefined">
          <img className="me-4" src={dumbleImg} style={{ width: '50px' }} />
          <h2 className="fw-bold">Recommended Workout</h2>
        </div>
        <div className="programstowrapper">
          {/* <article className="card programstoprogram" style={{width:'300px'}}>
            <span className="w-100 h-100">
              <img src={chestPressImg} className="w-100"/>
            </span>
            <h4 className="fw-bold">Chest Press</h4>
            <small className="text-secondary">This is the day that the lord has made. We will rejoice!</small>
            <Link className="bttn sm">Learn More</Link>
          </article> */}
          <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
            <span className="w-100 h-100">
              <img src={chestPressImg} className="w-100" />
            </span>
            <h4 className="fw-bold">Chest Press</h4>
            <div className="d-flex text-muted mt-3">
              <span style={{width:'fit-content', fontSize:'small'}}>765 kcal</span>
              <span style={{width:'fit-content', fontSize:'small'}}>15 reps</span>
            </div>
          </article>

          <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
            <span className="w-100 h-100">
              <img src={chestPressImg} className="w-100" />
            </span>
            <h4 className="fw-bold">Chest Press</h4>
            <div className="d-flex text-muted mt-3">
              <span style={{width:'fit-content', fontSize:'small'}}>765 kcal</span>
              <span style={{width:'fit-content', fontSize:'small'}}>15 reps</span>
            </div>
          </article>

          <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
            <span className="w-100 h-100">
              <img src={chestPressImg} className="w-100" />
            </span>
            <h4 className="fw-bold">Chest Press</h4>
            <div className="d-flex text-muted mt-3">
              <span style={{width:'fit-content', fontSize:'small'}}>765 kcal</span>
              <span style={{width:'fit-content', fontSize:'small'}}>15 reps</span>
            </div>
          </article>

          <article className="card programstoprogram pb-2" style={{ width: '300px' }}>
            <span className="w-100 h-100">
              <img src={chestPressImg} className="w-100" />
            </span>
            <h4 className="fw-bold">Chest Press</h4>
            <div className="d-flex text-muted mt-3">
              <span style={{width:'fit-content', fontSize:'small'}}>765 kcal</span>
              <span style={{width:'fit-content', fontSize:'small'}}>15 reps</span>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}

export default Programs
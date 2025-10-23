// src/components/Home/About/index.js
import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../../AnimatedLetters'
import './index.scss'

// brand icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDocker, faPython, faJava } from '@fortawesome/free-brands-svg-icons'

// custom logos
import TrinityLogo from '../../../assets/images/Trinity_College.png'
import EYLogo from '../../../assets/images/EY_logo.png'
import NavoyLogo from '../../../assets/images/Navoy.png'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const id = setTimeout(() => setLetterClass('text-animate-hover'), 3000)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'M', 'e']}
              idx={15}
            />
            <p>
                I'm a junior at Trinity College, double majoring in Economics and Computer Science. 
                During my first two years, I leaned more toward the finance side of tech rather than pure software development. 
                Last summer, I interned at EY as a Financial Transformation Consulting Intern, 
                where I worked closely on fintech-related projects. I also interned at Navoy, an AI travel tech startup, 
                as a Fundraising and Investor Relations Intern. These early experiences exposed me to the production side
                of computer science and made me realize that I want to be more hands-on with building and scaling products.
                </p>

                <p>
                Outside the classroom, I enjoy staying curious by reading about geopolitics, economics, 
                and emerging technologies, while constantly picking up new skills along the way.
            </p>

          </h1>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            {/* Front */}
            <div className="face face1">
              <FontAwesomeIcon icon={faDocker} color="#2496ED" />
            </div>

            {/* Right */}
            <div className="face face2">
              <FontAwesomeIcon icon={faPython} color="#3776AB" />
            </div>

            {/* Back */}
            <div className="face face3">
              <FontAwesomeIcon icon={faJava} color="#EA2D2E" />
            </div>

            {/* Left */}
            <div className="face face4">
              <img src={TrinityLogo} alt="Trinity College" />
            </div>

            {/* Top */}
            <div className="face face5">
              <img src={EYLogo} alt="EY" />
            </div>

            {/* Bottom */}
            <div className="face face6">
              <img src={NavoyLogo} alt="Navoy" />
            </div>
          </div>
        </div>
      </div>

      // src/components/Home/About/index.js
<Loader
  type="ball-spin-fade-loader"
  active
  className="loader-active"
/>

    </>
  )
}

export default About


import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loaders'

//import LogoTitle from "../../assets/images/logo-s.png";
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';
import Logo from './Logo';
import { useEffect } from 'react';

const Home = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate');
    const nameArray = [' ','T', 'a', 'h', 'a'];
    const jobArray = [
        'c','o','m','p','u','t','e','r',' ','s','c','i','e','n','c','e',' '
        ,'&',' ','e','c','o','n','o','m','i','c','s',' ', 's','t','u','d','e','n','t'
    ];

    useEffect(() => {
    const timeoutId = setTimeout(() => {
    setLetterClass('text-animate-hover');
    }, 4000);

    return () => clearTimeout(timeoutId); 
    }, []);


    return (
        <>
        <div className="home-page">
            <div className="text-zone">
                    <h1>
                    <span className={letterClass}>H</span>
                    <span className={`${letterClass} _12`}>i,</span>
                    <br /> 
                    <span className={`${letterClass} _13`}>I</span>
                    <span className={`${letterClass} _14`}>'m </span>
                     <AnimatedLetters letterClass={letterClass}
                    strArray={nameArray} 
                    idx={15} />
                    <br />
                    <AnimatedLetters letterClass={letterClass}
                    strArray={jobArray}
                    idx={22} />                   
                    </h1>   
                <h2> Trinity College, Hartford, CT - Class 2027 </h2>
                <Link to="/contact" className="flat-button">CONTACT ME</Link>
            <></>
        </div>
        <Logo />
        </div>
        </>
    );
}

export default Home;
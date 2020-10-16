import React from 'react';
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'; 
import '../assets/styles/pages/landing.css';

function Landing() {
  return (
    <div id='pade-landing'>
      <div className='content-wrapper'>
        <img src={logoImg} alt="Logo"/>
        <main>
          <h1>Bring happiness to the world</h1>
          <p>Visit orphanages and change the day of many children</p>
        </main>

        <div className="location">
          <strong>Poland</strong>
          <span>Wroclaw</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
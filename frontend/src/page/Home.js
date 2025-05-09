import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // import the CSS file

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Harmonize Meeting Club</h1>
        <p>Find Your Perfect Time !!</p>
        <div className="buttons">
          <Link to="/login">
            <button className="btn login-btn">LOGIN</button>
          </Link>
          <Link to="/signup">
            <button className="btn signup-btn">SIGN UP here</button>
          </Link>
        </div>
      </header>

      <section className="home-image-section">
        <img src="/path-to-your-image.jpg" alt="team working" className="home-image" />
      </section>
    </div>
  );
}

export default Home;

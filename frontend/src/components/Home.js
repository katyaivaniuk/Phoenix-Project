// frontend/src/components/Home.js
import React from 'react';

function Home() {
  return (
    <section className="content">
      <div className="left-image">
        <img src="/images/War.jpg" alt="War Image" /> {/* Make sure the image paths match */}
      </div>
      <div className="right-content">
        <img src="/images/Flag.jpg" alt="Flag Image" className="flag-image" /> {/* Correct path to images */}
        <h1 className="large-heading">Rebuild Ukraine with Us</h1>
        <p>Make a Difference Today</p>
        <button className="cta-button">Explore More</button>
      </div>
    </section>
  );
}

export default Home;


import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import MapComponent from "../MapComponent/MapComponent";

function Projects() {
    const regions = [
        { id: 'kharkiv', name: 'Kharkiv', image: '/images/kharkiv.jpg' },
        { id: 'kherson', name: 'Kherson', image: '/images/kherson.jpeg' },
        { id: 'donetsk', name: 'Donetsk', image: '/images/donetsk.jpeg' },
        { id: 'kyiv', name: 'Kyiv', image: '/images/kyiv.jpg' },
        { id: 'mykolaiv', name: 'Mykolaiv', image: '/images/mykolaiv.webp' },
        { id: 'luhansk', name: 'Luhansk', image: '/images/luhansk.jpg' },
        { id: 'odesa', name: 'Odesa', image: '/images/odesa.jpg' },
        { id: 'zaporizhzhia', name: 'Zaporizhzhia', image: '/images/zaporizhzhia.jpg' },
      ];


  return (
    <section className="projects-page-content">
      <div className="projects-page-intro">
        <div className="projects-intro-text">
          <h1 className="projects-heading">
            <span className="projects-heading-line1">One Map,</span>
            <span className="projects-heading-line2">Many Uses</span>
          </h1>
          <p className="projects-description">
            Use the map below to explore the regions impacted by the full-scale invasion. By clicking on a pin, you can learn about the reconstruction project in that region, its history, level of urgency, and the estimated rebuilding cost.
          </p>
          <a
          href="https://savelife.in.ua/en/donate-en/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button className="projects-support-button">
            #SUPPORTUKRAINE 💙💛
          </button>
        </a>
        </div>
        <div className="projects-intro-image">
          <img src="/images/Flag.png" alt="Independence Statue" />
        </div>
      </div>
      {/* Map Section */}
        <div className="interactive-map-section">
        <h2 className="section-title">Explore Impacted Regions</h2>
        <MapComponent />
      </div>

     {/* Reconstruction Projects Section */}
     <div className="reconstruction-projects-section">
        <h2 className="section-title">Reconstruction Projects Based on the Region</h2>
        <div className="regions-grid">
          {regions.map((region) => (
            <div key={region.id} className="region-card">
              <img src={region.image} alt={region.name} 
              className="region-image"  style={{ filter: 'brightness(65%)' }}/>
              <h3 className="region-name">{region.name}</h3> {/* Static name in the center */}
              <div className="region-overlay">
                <Link to={`/projects/${region.id}`} className="learn-more-button">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
   
export default Projects;

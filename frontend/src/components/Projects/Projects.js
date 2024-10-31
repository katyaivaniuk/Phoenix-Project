import React from 'react';
import './Projects.css';

function Projects() {
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
          <button className="projects-support-button">#SUPPORTUKRAINE 💙💛</button>
        </div>
        <div className="projects-intro-image">
          <img src="/images/Flag.png" alt="Independence Statue" />
        </div>
      </div>
    </section>
  );
}

export default Projects;

import React from 'react';
import './About.css'; 

function About() {
    return (
        <div className="about-section">
            <div className="about-container">
                <div className="about-text">
                    <h3>Hi there! I'm Katya 👋🏻</h3>
                    <p>
                    I'm a Ukrainian, currently pursuing my studies in the United States. 
                    My passion lies in contributing to the rebuilding and recovery of Ukraine in any way I can. 
                    My goal is to help create a brighter, more sustainable future for Ukraine - a future where communities thrive, infrastructure is restored, and the country becomes an even better place for its citizens to live and flourish. 
                    Every step toward this vision matters, and I am dedicated to making a meaningful impact along the way.
                    </p>

                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/katerynaivaniuk" target="_blank" rel="noopener noreferrer">
                            <img src="/images/linkedin.png" alt="LinkedIn" />
                        </a>
                        <a href="mailto:kateryna@uni.minerva.edu" target="_blank" rel="noopener noreferrer">
                            <img src="/images/gmail1.png" alt="Gmail" />
                        </a>
                        <a href="https://github.com/katyaivaniuk" target="_blank" rel="noopener noreferrer">
                            <img src="/images/github.png" alt="Github" />
                        </a>
                    </div>
                </div>
                <div className="about-photo">
                    <img src="/images/myphoto.jpg" alt="Me" />
                </div>
            </div>
        </div>
    );
}

export default About;

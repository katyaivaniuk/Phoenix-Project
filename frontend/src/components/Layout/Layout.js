import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';  // Ensure your CSS file path is correct

function Layout() {
    return (
        <div className="site-container">
            <header>
                <nav className="nav-bar">
                    <div className="nav-left">
                        <Link to="/">
                            <img src="/images/Logo.png" alt="Phoenix Ukraine Logo" className="nav-logo" />
                        </Link>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <span className="nav-title">Phoenix Ukraine</span>
                        </Link>
                    </div>
                    <ul className="nav-menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="content">
                <Outlet />  
            </main>
<footer>
    <div className="footer-container">
        <div className="footer-left">
            <h3>Contact</h3>
            <p>Email: <a href="mailto:kateryna@uni.minerva.edu">kateryna@minerva.edu</a></p>
            <p>Phone: <a href="tel:415-579-6088">415-579-6088</a></p>
        </div>
        
        <div className="footer-center">
        <Link to="/">
            <img src="/images/Logo.png" alt="Phoenix Ukraine Logo" className="footer-logo" />
        </Link> 
        <Link to="/"  style={{ textDecoration: 'none' }}>
            <h1>Phoenix Ukraine</h1>
        </Link> 
            <p>Rebuilding Infrastructure for a Brighter Future</p>
        </div>
        
        <div className="footer-right">
            <h3>Follow Us</h3>
            <div className="social-icons">
            <p><a href="https://facebook.com"><span>👤</span> Facebook</a></p>
            <p><a href="https://linkedin.com"><span>🔗</span> LinkedIn</a></p>
        </div>
        </div>
    </div>
</footer>

        </div>
    );
}

export default Layout;


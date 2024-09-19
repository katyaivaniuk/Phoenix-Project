import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';  // Ensure your CSS file path is correct

function Layout({ children }) {
    return (
        <div className="site-container">
            <header>
                <div className="top-bar">
                    <div className="logo-container">
                        <img src="/images/Logo.png" alt="Phoenix Ukraine Logo" className="logo" />
                        <h1 className="site-title">Phoenix Ukraine</h1>
                    </div>
                </div>
                <nav className="menu-bar">
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </header>
            <main className="content">{children}</main>
            <footer>
                <div className="footer-container">
                    <div className="footer-left">
                        <p>Email: kateryna@uni.minerva.edu</p>
                    </div>
                    <div className="footer-center">
                        <h1>Phoenix Ukraine</h1>
                        <img src="/images/Logo.png" alt="Phoenix Ukraine Logo" className="footer-logo" />
                    </div>
                    <div className="footer-right">
                        <p>Phone: 123-456-7890</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;

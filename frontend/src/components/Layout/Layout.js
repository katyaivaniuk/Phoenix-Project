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
                        <p>Email: kateryna@uni.minerva.edu</p>
                    </div>
                    <div className="footer-center">
                        <h1>Phoenix Ukraine</h1>
                        <img src="/images/Logo.png" alt="Phoenix Ukraine Logo" className="footer-logo" />
                    </div>
                    <div className="footer-right">
                        <p>Phone: 415-579-6088</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;


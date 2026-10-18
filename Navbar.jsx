import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.brandContainer}>
        <Link to="/" style={styles.brandLogo}>
          Richfield Connect
        </Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/feed" style={styles.link}>Feed</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/signup" style={styles.signUpBtn}>Sign Up</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#003087',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  brandLogo: {
    color: '#FFFFFF',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'opacity 0.2s ease'
  },
  signUpBtn: {
    backgroundColor: '#FFFFFF',
    color: '#003087',
    padding: '6px 14px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          &copy; {new Date().getFullYear()} Richfield Graduate Institute of Technology (Pty) Ltd. All Rights Reserved.
        </p>
        <p style={styles.text}>
          Registered with the DHET as a Private Higher Education Institution under Registration No. 2000/HE07/008.
        </p>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link> | 
          <Link to="/about" style={styles.link}>About</Link> | 
          <Link to="/signup" style={styles.link}>Sign Up</Link> | 
          <Link to="/profile" style={styles.link}>Profile</Link> | 
          <Link to="/feed" style={styles.link}>Feed</Link>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#003087',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
    borderTop: '3px solid #002266'
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  text: {
    fontSize: '0.85rem',
    opacity: 0.9
  },
  links: {
    marginTop: '5px',
    fontSize: '0.9rem'
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    margin: '0 8px'
  }
};
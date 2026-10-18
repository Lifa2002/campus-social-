import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-view">
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Richfield Connect</h1>
        <p style={styles.heroSlogan}>
          Connecting Students, Sharing Knowledge, and Empowering Academic Excellence.
        </p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/signup" className="btn-primary" style={styles.ctaButton}>
            Register Now
          </Link>
        </div>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Platform Key Features</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Connect with Peers</h3>
            <p style={styles.cardText}>
              Build your institutional network by interacting with fellow students across all Richfield campuses.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Share Academic Ideas</h3>
            <p style={styles.cardText}>
              Post questions, share insights, and discuss academic assignments in a professional, distraction-free environment.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Build Your Profile</h3>
            <p style={styles.cardText}>
              Showcase your technical skills, academic interests, and campus affiliation with a dedicated student profile.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    backgroundColor: '#003087',
    color: '#FFFFFF',
    padding: '60px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '40px'
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '10px'
  },
  heroSlogan: {
    fontSize: '1.2rem',
    opacity: 0.9,
    maxWidth: '700px',
    margin: '0 auto'
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    color: '#003087',
    padding: '12px 28px',
    fontSize: '1.1rem'
  },
  featuresSection: {
    padding: '10px 0'
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#003087',
    marginBottom: '25px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  cardTitle: {
    color: '#003087',
    marginBottom: '10px'
  },
  cardText: {
    color: '#555555',
    fontSize: '0.95rem'
  }
};
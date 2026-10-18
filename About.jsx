import React from 'react';

export default function About() {
  return (
    <div className="page-view" style={styles.container}>
      <h2 style={styles.heading}>About Richfield Connect</h2>
      
      <section style={styles.section}>
        <h3 style={styles.subHeading}>Statement of Purpose</h3>
        <p style={styles.paragraph}>
          Richfield Connect is an institutional digital engagement platform specifically developed for students of Richfield Graduate Institute of Technology. Designed to foster academic collaboration and community engagement, the platform provides a structured environment where students can register personal profiles, post academic insights, share course project ideas, and interact with peers seamlessly.
        </p>
      </section>

      <section style={styles.section}>
        <h3 style={styles.subHeading}>Community Guidelines</h3>
        <ul style={styles.list}>
          <li>Maintain absolute professionalism and mutual respect across all discussions.</li>
          <li>Uphold institutional academic integrity policies—do not share uncredited work or assessment solutions.</li>
          <li>Ensure all posted content is directly relevant to academic growth and student engagement.</li>
          <li>Refrain from using offensive language, harassment, or personal attacks.</li>
          <li>Protect personal privacy by avoiding the disclosure of sensitive credentials or private data.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h3 style={styles.subHeading}>Contact Information</h3>
        <div style={styles.contactCard}>
          <p><strong>Institutional Email:</strong> support@richfield.ac.za</p>
          <p><strong>Main Campus Location:</strong> Richfield Graduate Institute, Bryanston Campus, Johannesburg</p>
          <p><strong>Technical Support:</strong> Web Technology Department (Ext. 512)</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  heading: {
    color: '#003087',
    marginBottom: '20px',
    borderBottom: '2px solid #003087',
    paddingBottom: '10px'
  },
  section: {
    marginBottom: '25px'
  },
  subHeading: {
    color: '#003087',
    marginBottom: '10px'
  },
  paragraph: {
    color: '#333333',
    lineHeight: '1.6'
  },
  list: {
    paddingLeft: '20px',
    lineHeight: '1.8',
    color: '#333333'
  },
  contactCard: {
    backgroundColor: '#F5F5F5',
    padding: '15px',
    borderRadius: '4px',
    borderLeft: '4px solid #003087',
    lineHeight: '1.8'
  }
};
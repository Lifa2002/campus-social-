import React from 'react';

export default function ProfilePreview({ formData }) {
  const initials = formData.fullName
    ? formData.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'RC';

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Live Profile Preview</h3>
      <div style={styles.avatar}>{initials}</div>
      <h4 style={styles.name}>{formData.fullName || 'Student Name'}</h4>
      <p style={styles.campus}>
        <strong>Campus:</strong> {formData.campus || 'Not selected'}
      </p>
      <div style={styles.bioBox}>
        <p style={styles.bioText}>
          {formData.bio || 'Your short biography will be rendered live here as you complete the form...'}
        </p>
      </div>
      <div style={styles.interestsContainer}>
        <strong>Interests:</strong>
        <div style={{ marginTop: '5px' }}>
          {formData.interests && formData.interests.length > 0 ? (
            formData.interests.map((interest) => (
              <span key={interest} className="badge">
                {interest}
              </span>
            ))
          ) : (
            <span style={{ fontSize: '0.85rem', color: '#555555' }}>
              No interests selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    textAlign: 'center',
    position: 'sticky',
    top: '20px'
  },
  title: {
    color: '#003087',
    marginBottom: '15px',
    borderBottom: '2px solid #F5F5F5',
    paddingBottom: '8px'
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#003087',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 auto 12px auto'
  },
  name: {
    fontSize: '1.2rem',
    marginBottom: '5px'
  },
  campus: {
    fontSize: '0.9rem',
    color: '#555555',
    marginBottom: '10px'
  },
  bioBox: {
    backgroundColor: '#F5F5F5',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'left',
    minHeight: '60px',
    marginBottom: '15px'
  },
  bioText: {
    fontSize: '0.88rem',
    color: '#333333',
    fontStyle: 'italic',
    wordBreak: 'break-word'
  },
  interestsContainer: {
    textAlign: 'left'
  }
};
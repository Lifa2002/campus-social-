import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Profile() {
  const { state } = useContext(AppContext);
  const user = state.user;

  if (!user) {
    return (
      <div className="page-view" style={styles.noUserContainer}>
        <h2>No Registered Profile Found</h2>
        <p style={{ margin: '15px 0', color: '#555555' }}>
          Please complete registration to view your dynamic academic profile.
        </p>
        <Link to="/signup" className="btn-primary">
          Go to Registration
        </Link>
      </div>
    );
  }

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'RC';

  const userPostCount = state.posts.filter(
    (post) => post.username === user.fullName
  ).length;

  return (
    <div className="page-view" style={styles.card}>
      <div style={styles.headerSection}>
        <div style={styles.avatar}>{initials}</div>
        <h2 style={styles.fullName}>{user.fullName}</h2>
        <p style={styles.studentNo}>Student No: {user.studentNumber}</p>
        <span className="badge" style={{ fontSize: '0.9rem', marginTop: '6px' }}>
          {user.campus} Campus
        </span>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>{userPostCount}</span>
          <span style={styles.statLabel}>Posts</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>12</span>
          <span style={styles.statLabel}>Connections</span>
        </div>
        <div style={styles.statBox}>
          <span style={styles.statNumber}>4</span>
          <span style={styles.statLabel}>Groups</span>
        </div>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.subTitle}>Contact Information</h3>
        <p><strong>Email Address:</strong> {user.email}</p>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.subTitle}>Biography</h3>
        <p style={styles.bio}>{user.bio}</p>
      </div>

      <div style={styles.infoSection}>
        <h3 style={styles.subTitle}>Academic Interests</h3>
        <div>
          {user.interests && user.interests.map((interest) => (
            <span key={interest} className="badge">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    maxWidth: '700px',
    margin: '0 auto'
  },
  noUserContainer: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #dddddd'
  },
  headerSection: {
    textAlign: 'center',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '20px',
    marginBottom: '20px'
  },
  avatar: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#003087',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 auto 15px auto'
  },
  fullName: {
    color: '#003087',
    fontSize: '1.6rem'
  },
  studentNo: {
    color: '#555555',
    fontSize: '0.95rem'
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '25px'
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  statNumber: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#003087'
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#555555'
  },
  infoSection: {
    marginBottom: '20px'
  },
  subTitle: {
    color: '#003087',
    fontSize: '1.1rem',
    marginBottom: '8px',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '4px'
  },
  bio: {
    color: '#333333',
    lineHeight: '1.6'
  }
};
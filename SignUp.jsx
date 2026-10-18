import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProfilePreview from '../components/ProfilePreview';

const AVAILABLE_INTERESTS = [
  'Programming',
  'Design',
  'Data Science',
  'Networking',
  'Cybersecurity'
];

export default function SignUp() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    studentNumber: '',
    campus: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: [],
    bio: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) errorMsg = 'Full Name is required.';
        break;

      case 'studentNumber':
        if (!/^\d+$/.test(value)) {
          errorMsg = 'Student Number must contain numbers only.';
        } else if (value.length < 6) {
          errorMsg = 'Student Number must be at least 6 digits.';
        }
        break;

      case 'campus':
        if (!value) errorMsg = 'Please select a campus.';
        break;

      case 'email':
        if (!value.includes('@') || !value.match(/\.[a-zA-Z]{2,}$/)) {
          errorMsg = 'Please enter a valid email address (e.g., .com or .ac.za).';
        }
        break;

      case 'password':
        if (value.length < 8) {
          errorMsg = 'Password must be at least 8 characters long.';
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          errorMsg = 'Passwords do not match.';
        }
        break;

      case 'interests':
        if (!value || value.length === 0) {
          errorMsg = 'At least one interest must be selected.';
        }
        break;

      case 'bio':
        if (!value.trim()) {
          errorMsg = 'Short Bio is required.';
        } else if (value.trim().length < 20) {
          errorMsg = 'Short Bio must be at least 20 characters.';
        }
        break;

      case 'termsAccepted':
        if (!value) {
          errorMsg = 'You must accept the Terms and Conditions.';
        }
        break;

      default:
        break;
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    if (type === 'checkbox' && name === 'interests') {
      if (checked) {
        updatedValue = [...formData.interests, value];
      } else {
        updatedValue = formData.interests.filter((i) => i !== value);
      }
    } else if (type === 'checkbox') {
      updatedValue = checked;
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    const error = validateField(name, updatedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch({ type: 'REGISTER_USER', payload: formData });
    navigate('/profile');
  };

  return (
    <div className="page-view" style={styles.layoutContainer}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Student Registration</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Student Number *</label>
            <input
              type="text"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {errors.studentNumber && <span className="error-text">{errors.studentNumber}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Campus *</label>
            <select
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            >
              <option value="">-- Select Campus --</option>
              <option value="Bryanston">Bryanston Campus</option>
              <option value="Durban">Durban Campus</option>
              <option value="Pretoria">Pretoria Campus</option>
              <option value="Cape Town">Cape Town Campus</option>
            </select>
            {errors.campus && <span className="error-text">{errors.campus}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Academic Interests (Select at least 1) *</label>
            <div style={styles.checkboxGroup}>
              {AVAILABLE_INTERESTS.map((interest) => (
                <label key={interest} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                  />
                  {interest}
                </label>
              ))}
            </div>
            {errors.interests && <span className="error-text">{errors.interests}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Short Bio (Min. 20 characters) *</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              style={styles.input}
            ></textarea>
            {errors.bio && <span className="error-text">{errors.bio}</span>}
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I accept the Richfield Terms and Conditions *
            </label>
            {errors.termsAccepted && (
              <span className="error-text">{errors.termsAccepted}</span>
            )}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Register Profile
          </button>
        </form>
      </div>

      <div style={styles.previewContainer}>
        <ProfilePreview formData={formData} />
      </div>
    </div>
  );
}

const styles = {
  layoutContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
    alignItems: 'start'
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    padding: '25px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  title: {
    color: '#003087',
    marginBottom: '20px',
    borderBottom: '2px solid #F5F5F5',
    paddingBottom: '8px'
  },
  fieldGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '5px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },
  previewContainer: {
    position: 'sticky',
    top: '20px'
  }
};
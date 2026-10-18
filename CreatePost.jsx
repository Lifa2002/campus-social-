import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CreatePost() {
  const { state, dispatch } = useContext(AppContext);
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]); // Array of { type: 'image'|'video', url: string }
  const [error, setError] = useState('');

  // Handle multiple image and video selection
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');

      if (!isImage && !isVideo) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaFiles((prev) => [
          ...prev,
          { type: isVideo ? 'video' : 'image', url: reader.result }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove individual file from preview
  const handleRemoveMedia = (indexToRemove) => {
    setMediaFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && mediaFiles.length === 0) {
      setError('Post must contain text, images, or a video.');
      return;
    }

    const username = state.user ? state.user.fullName : 'Anonymous Student';

    const newPost = {
      id: Date.now(),
      username: username,
      timestamp: new Date().toLocaleString(),
      content: content.trim(),
      media: mediaFiles, // Array of media objects passed to state
      likes: 0,
      liked: false,
      reshares: 0,
      comments: []
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    setContent('');
    setMediaFiles([]);
    setError('');
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Create Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          style={styles.textarea}
          rows="3"
          placeholder="Share an academic update, study question, or media..."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
        ></textarea>

        {/* Media Preview Grid */}
        {mediaFiles.length > 0 && (
          <div style={styles.previewGrid}>
            {mediaFiles.map((item, index) => (
              <div key={index} style={styles.previewItem}>
                {item.type === 'video' ? (
                  <video src={item.url} style={styles.previewMedia} controls />
                ) : (
                  <img src={item.url} alt={`Upload preview ${index}`} style={styles.previewMedia} />
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(index)}
                  style={styles.removeBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <span style={styles.error}>{error}</span>}

        <div style={styles.buttonRow}>
          <label style={styles.fileLabel}>
            📁 Add Photos/Videos
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaChange}
              style={{ display: 'none' }}
            />
          </label>
          <button type="submit" className="btn-primary">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    marginBottom: '25px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  heading: { color: '#003087', marginBottom: '10px', fontSize: '1.1rem' },
  textarea: { width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical', boxSizing: 'border-box' },
  previewGrid: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' },
  previewItem: { position: 'relative', width: '110px', height: '110px' },
  previewMedia: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ddd' },
  removeBtn: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justify: 'center'
  },
  error: { color: '#d9534f', fontSize: '0.9rem', display: 'block', marginTop: '5px' },
  buttonRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  fileLabel: {
    backgroundColor: '#f0f2f5',
    color: '#003087',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    border: '1px solid #ccc'
  }
};
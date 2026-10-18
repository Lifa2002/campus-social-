import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Post({ post }) {
  const { state, dispatch } = useContext(AppContext);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || '');

  const handleLikeToggle = () => {
    dispatch({ type: 'TOGGLE_LIKE', payload: post.id });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (confirmDelete) {
      dispatch({ type: 'DELETE_POST', payload: post.id });
    }
  };

  const handleReshare = () => {
    dispatch({ type: 'RESHARE_POST', payload: post.id });
  };

  // Save Post Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editContent.trim()) return;

    dispatch({
      type: 'EDIT_POST',
      payload: { id: post.id, content: editContent.trim() }
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(post.content || '');
    setIsEditing(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const commenterName = state.user ? state.user.fullName : 'Anonymous Student';

    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        postId: post.id,
        comment: {
          id: Date.now(),
          username: commenterName,
          text: commentText.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      }
    });

    setCommentText('');
  };

  // Support both new `post.media` array format and legacy single `post.image` string
  const mediaList = post.media || (post.image ? [{ type: 'image', url: post.image }] : []);
  const commentsList = post.comments || [];
  const reshareCount = post.reshares || 0;

  return (
    <div style={styles.card} className="new-post-animated">
      <div style={styles.header}>
        <div>
          <h4 style={styles.username}>{post.username}</h4>
          <span style={styles.timestamp}>
            {post.timestamp} {post.isEdited && '(edited)'}
          </span>
        </div>
      </div>

      {/* Inline Editing Form vs Regular Display */}
      {isEditing ? (
        <form onSubmit={handleSaveEdit} style={styles.editForm}>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={styles.editTextarea}
            rows="3"
          />
          <div style={styles.editButtons}>
            <button type="button" onClick={handleCancelEdit} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={styles.saveBtn}>
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        post.content && <p style={styles.content}>{post.content}</p>
      )}

      {/* Render Attached Media (Images & Videos) */}
      {mediaList.length > 0 && (
        <div style={mediaList.length > 1 ? styles.mediaGrid : styles.singleMediaWrapper}>
          {mediaList.map((item, index) => (
            <div key={index} style={mediaList.length > 1 ? styles.gridItem : styles.singleItem}>
              {item.type === 'video' ? (
                <video src={item.url} controls style={styles.videoElement} />
              ) : (
                <img src={item.url} alt={`Post attachment ${index}`} style={styles.imageElement} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button
          onClick={handleLikeToggle}
          style={{
            ...styles.actionBtn,
            backgroundColor: post.liked ? '#003087' : '#FFFFFF',
            color: post.liked ? '#FFFFFF' : '#003087'
          }}
        >
          {post.liked ? '♥ Liked' : '♡ Like'} ({post.likes})
        </button>

        <button onClick={handleReshare} style={styles.reshareBtn}>
          🔁 Reshare ({reshareCount})
        </button>

        <button 
          onClick={() => setShowComments(!showComments)} 
          style={styles.commentToggleBtn}
        >
          💬 Comments ({commentsList.length})
        </button>

        {!isEditing && (
          <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
            ✏️ Edit
          </button>
        )}

        <button onClick={handleDelete} style={styles.deleteBtn}>
          Delete
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={styles.commentSection}>
          <div style={styles.commentList}>
            {commentsList.length > 0 ? (
              commentsList.map((c) => (
                <div key={c.id || Math.random()} style={styles.commentItem}>
                  <div style={styles.commentHeader}>
                    <strong>{c.username}</strong>
                    <span style={styles.commentTime}>{c.timestamp}</span>
                  </div>
                  <p style={styles.commentText}>{c.text}</p>
                </div>
              ))
            ) : (
              <p style={styles.noComments}>No comments yet. Be the first to comment!</p>
            )}
          </div>

          <form onSubmit={handleAddComment} style={styles.commentForm}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={styles.commentInput}
            />
            <button type="submit" className="btn-primary" style={styles.commentSubmitBtn}>
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    padding: '18px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
    overflow: 'hidden',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  username: {
    color: '#003087',
    fontSize: '1rem',
    margin: 0
  },
  timestamp: {
    fontSize: '0.75rem',
    color: '#555555'
  },
  content: {
    fontSize: '0.95rem',
    marginBottom: '12px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  },
  editForm: {
    marginBottom: '12px'
  },
  editTextarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #003087',
    fontSize: '0.95rem',
    boxSizing: 'border-box'
  },
  editButtons: {
    display: 'flex',
    justify: 'flex-end',
    gap: '8px',
    marginTop: '6px'
  },
  cancelBtn: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '4px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  saveBtn: {
    padding: '4px 12px',
    fontSize: '0.85rem'
  },
  singleMediaWrapper: {
    marginBottom: '15px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  singleItem: {
    width: '100%',
    maxHeight: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '8px',
    marginBottom: '15px',
    width: '100%'
  },
  gridItem: {
    height: '220px',
    overflow: 'hidden',
    borderRadius: '6px',
    backgroundColor: '#000000'
  },
  videoElement: {
    width: '100%',
    maxHeight: '450px',
    objectFit: 'contain',
    display: 'block'
  },
  imageElement: {
    width: '100%',
    height: '100%',
    maxHeight: '450px',
    objectFit: 'cover',
    display: 'block'
  },
  actions: {
    display: 'flex',
    gap: '8px',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '10px',
    flexWrap: 'wrap'
  },
  actionBtn: {
    border: '1px solid #003087',
    padding: '5px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer'
  },
  reshareBtn: {
    backgroundColor: '#FFFFFF',
    color: '#003087',
    border: '1px solid #003087',
    padding: '5px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer'
  },
  commentToggleBtn: {
    backgroundColor: '#FFFFFF',
    color: '#555555',
    border: '1px solid #ccc',
    padding: '5px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer'
  },
  editBtn: {
    backgroundColor: '#FFFFFF',
    color: '#555555',
    border: '1px solid #ccc',
    padding: '5px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer'
  },
  deleteBtn: {
    backgroundColor: '#FFFFFF',
    color: '#d9534f',
    border: '1px solid #d9534f',
    padding: '5px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginLeft: 'auto'
  },
  commentSection: {
    marginTop: '12px',
    backgroundColor: '#f9f9f9',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #eee'
  },
  commentList: {
    marginBottom: '10px'
  },
  commentItem: {
    borderBottom: '1px solid #e5e5e5',
    paddingBottom: '6px',
    marginBottom: '6px'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.85rem',
    color: '#003087'
  },
  commentTime: {
    fontSize: '0.7rem',
    color: '#888'
  },
  commentText: {
    margin: '3px 0 0 0',
    fontSize: '0.85rem',
    color: '#333'
  },
  noComments: {
    fontSize: '0.85rem',
    color: '#777',
    margin: '5px 0'
  },
  commentForm: {
    display: 'flex',
    gap: '8px'
  },
  commentInput: {
    flex: 1,
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '0.85rem'
  },
  commentSubmitBtn: {
    padding: '6px 12px',
    fontSize: '0.85rem'
  }
};
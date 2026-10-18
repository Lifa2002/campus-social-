import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

export default function Feed() {
  const { state } = useContext(AppContext);

  return (
    <div className="page-view" style={{ maxWidth: '750px', margin: '0 auto' }}>
      <h2 style={styles.title}>Student Discussion Feed</h2>
      <CreatePost />
      <div>
        {state.posts && state.posts.length > 0 ? (
          state.posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div style={styles.emptyFeed}>
            <p>No posts available. Be the first student to share an update!</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  title: {
    color: '#003087',
    marginBottom: '20px'
  },
  emptyFeed: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#555555',
    border: '1px solid #dddddd'
  }
};
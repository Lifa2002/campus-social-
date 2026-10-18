import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  user: null,
  posts: []
};

export const AppContext = createContext();

function appReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE_STATE':
      return {
        ...state,
        user: action.payload.user,
        posts: action.payload.posts
      };

    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload
      };

    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case 'TOGGLE_LIKE':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload) {
            const updatedLiked = !post.liked;
            return {
              ...post,
              liked: updatedLiked,
              likes: updatedLiked ? post.likes + 1 : post.likes - 1
            };
          }
          return post;
        })
      };

    case 'RESHARE_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? { ...post, reshares: (post.reshares || 0) + 1 }
            : post
        )
      };

    case 'EDIT_POST':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                content: action.payload.content,
                isEdited: true
              }
            : post
        )
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...(post.comments || []), action.payload.comment]
              }
            : post
        )
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload)
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('richfield_connect_user');
      const storedPosts = localStorage.getItem('richfield_connect_posts');

      dispatch({
        type: 'HYDRATE_STATE',
        payload: {
          user: storedUser ? JSON.parse(storedUser) : null,
          posts: storedPosts ? JSON.parse(storedPosts) : []
        }
      });
    } catch (error) {
      console.error('Failed to parse localStorage data', error);
    }
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('richfield_connect_user', JSON.stringify(state.user));
    }
    localStorage.setItem('richfield_connect_posts', JSON.stringify(state.posts));
  }, [state.user, state.posts]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
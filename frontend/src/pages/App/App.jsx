import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../services/authService';

import './App.css';

import NavBar from '../../components/NavBar/NavBar';
import PostForm from '../../components/PostForm/PostForm'; 
import HomePage from '../HomePage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import PostDetailsPage from '../PostDetailsPage/PostDetailsPage'; 
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';

import * as postService from '../../services/postService';

function App() {
  const [user, setUser] = useState(getUser());
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index();
      // set state: 
      setPosts(postsData);
    };
    if (user) fetchAllPosts();
  }, [user]);


  const handleAddPost = async (postFormData) => {
    const newPost = await postService.create(postFormData); 
    setPosts([newPost, ...posts]); 
    navigate('/posts'); 
  }; 

  const handleDeletePost = async (postId) => {
    const deletePost = await postService.deletePost(postId);
    setPosts(posts.filter((post) => post._id !== deletePost._id)); 
    navigate('/posts');
  };

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostListPage posts={posts} />} />
            <Route path="/posts/new" element={<PostForm handleAddPost={handleAddPost} />} />
            <Route path="/posts/:postId" element={<PostDetailsPage user={user}  handleDeletePost={handleDeletePost} />}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;

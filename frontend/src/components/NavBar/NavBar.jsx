import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import './NavBar.css';
import PostListPage from '../../pages/PostListPage/PostListPage';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      
      {user ? (
        <>
          <Link to="/">Home</Link>
          &nbsp; | &nbsp;
          <Link to="/posts">My Posts</Link>
          &nbsp; | &nbsp;
          <Link to="/posts/new">New Post</Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp;&nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          &nbsp;  &nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

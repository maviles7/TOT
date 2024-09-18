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
          <Link className="navBar" to="/">Tales of Travels</Link>
          &nbsp; | &nbsp;
          <Link className="navBar" to="/posts">My Travels</Link>
          &nbsp; | &nbsp;
          <Link className="navBar" to="/posts/new">New Post</Link>
          &nbsp; | &nbsp;
          <Link className="navBar" to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp;&nbsp;
          <span>{user.name}</span>
        </>
      ) : (
        <>
          <Link className="navBar" to="/login">Log In</Link>
          &nbsp;  &nbsp;
          <Link className="navBar" to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

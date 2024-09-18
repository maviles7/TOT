import { Link } from "react-router-dom"

export default function HomePage({ posts, user }) {

  return ( 
    <>
    <div>
      
    </div>
    <h1>Tales of Travel</h1>
    {user ? (
    posts.map((post) => (
      <Link key={post._id} to={`/posts/${post._id}`}>
        <article>
          <header>
            <h2>{post.title}</h2>
          </header>
          <p>{post.location}</p>
        </article>
      </Link>
    ))
    ) : (
      <h3>Welcome to your travel log. A simple way to keep track of where you have been and what you thought.</h3>
    )}
    </>
  ); 
};

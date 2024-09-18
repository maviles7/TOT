import { Link } from "react-router-dom"

export default function PostListPage({ posts, user }) {
  
  return ( 
    <>
     <br />
    <h1>My Tales</h1>
    {posts.filter((post) => post.author._id === user._id).map((post) => (
      <Link key={post._id} to={`/posts/${post._id}`}>
        <article>
          <header>
            <h2>{post.title}</h2>
          </header>
          <p>{post.location}</p>
        </article>
      </Link>
    ))}
    </>
  ); 
};

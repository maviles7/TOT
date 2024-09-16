import { Link } from "react-router-dom"

export default function HomePage({ posts }) {

  return ( 
    <>
    <h1>Tales of Travel</h1>
    {posts.map((post) => (
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

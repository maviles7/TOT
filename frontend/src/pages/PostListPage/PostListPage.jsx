import { Link } from "react-router-dom"

export default function PostListPage({ posts, user }) {
  
  return ( 
    <>
     <br />
    <h1>My Tales</h1>
    <div className="homeContent">
    {posts.filter((post) => post.author._id === user._id).map((post) => (
      <Link className="detailContent" key={post._id} to={`/posts/${post._id}`}>
        <article style={{width: "90%"}}>
          <header>
            <h2>{post.title}</h2>
          </header>
          <p style={{width: "100%"}}>{post.location}</p>
        </article>
      </Link>
    ))}
    </div>
    </>
  ); 
};

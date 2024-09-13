import { Link } from "react-router-dom"

export default function PostListPage({ posts }) {

  return (
    <main>
      {posts.map((post) => (
        <Link key={post._id} to={`/posts/${post._id}`}>
          <article>
            <h2>{post.title}</h2>
          </article>
        </Link>
      ))}
    </main>
  )
}

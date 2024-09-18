import { Link } from "react-router-dom"

const accessToken = import.meta.env.VITE_MAP_BOX_TOKEN; 

export default function HomePage({ posts, user }) {

  return ( 
    <>
    <br />
    <h1>Explore Feed</h1>
    {user ? (
    posts.map((post) => (
      <Link key={post._id} to={`/posts/${post._id}`}>
        <article>
          <header>
          <img
                className="homeImage"
                alt={`static Mapbox map of the ${post.location} area`}
                src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${post.geocoordinates[0]},${post.geocoordinates[1]},9.67,0.00,0.00/1000x600@2x?access_token=${accessToken}`}
            />
            <h2>{post.title}</h2>
          </header>
        </article>
      </Link>
    ))
    ) : (
      <h3>Welcome to your travel log. A simple way to keep track of where you have been and what you thought.</h3>
    )}
    </>
  ); 
};

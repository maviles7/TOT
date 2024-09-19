import { Link } from "react-router-dom";

const accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

export default function HomePage({ posts, user }) {
  return (
    <>
      <br />
      {user && <h1>Explore Feed</h1>}
      {user ? (
        <div className="page-layout">
          {posts.map((post) => (
            <Link className="white-background" key={post._id} to={`/posts/${post._id}`}>
              <article className="home-page-layout">
                <header>
                  <img
                    alt={`static Mapbox map of the ${post.location} area`}
                    src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${post.geocoordinates[0]},${post.geocoordinates[1]},9.67,0.00,0.00/1000x600@2x?access_token=${accessToken}`}
                  />
                  <h2>{post.title}</h2>
                  <p>{post.author.name}</p>
                </header>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <h1 id='homepage-title'>Tales of Travel</h1>
          <div className='lo-imgs'>
            <img 
              className='lo-img'
              alt='image of feet on the glass part of the London Bridge looking down onto the River Thames'
              src="https://i.imgur.com/HwXekyw.jpeg"
            />
            <img 
              className='lo-img'
              alt='image of Sydney Opera House'
              src='https://i.imgur.com/nRuzDsX.jpeg'
            />
            <img 
              className='lo-img'
              alt='image of the Grand Palace in Brussels, Belgium'
              src="https://i.imgur.com/vSVH2n1.jpeg"
            />
            <img 
              className='lo-img'
              alt="image overlooking cliff at Cliffs of Moher"
              src="https://i.imgur.com/LjNn76e.jpeg"
            />
          </div>
          <h3>
            Track of where you have been and what you thought.
          </h3>
          <h2>Tell your tales.</h2>
          <div className="hp-click">
            <Link className='hp-links' to="/signup">
              Sign Up
            </Link>
            <Link className='hp-links' to="/login">
              Log In
            </Link>
          </div>
        </>
      )}
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

import * as postService from '../../services/postService'; 
import * as commentService from '../../services/commentService'; 

import CommentForm from "../../components/CommentForm/CommentForm";

//

// import { accessToken } from "mapbox-gl";
// mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

const accessToken = import.meta.env.VITE_MAP_BOX_TOKEN; 

const postDetails = ({ user, handleDeletePost }) => {
    const { postId } = useParams(); 
    console.log('postId: ', postId); 

    const [post, setPost] = useState(null); 

    // const mapContainerRef = useRef(document.querySelector('.map-container'));
    // const mapRef = useRef();
    // const [map, setMap] = useState(null);

    // useEffect(() => {
    //     let container = document.querySelector('#map')
    //     console.log(container)
    //     console.log(mapContainerRef.current);
    //     if (mapContainerRef.current && !map) {
    //         const map = new mapboxgl.Map({
    //         container: 'map',
    //         center: [-74.5, 40], // starting position [lng, lat]
    //         zoom: 9, // starting zoom
    //         });
    //         setMap(map);
    //     }; 
    // },[]);

    useEffect(() => {
        const fetchPost = async () => {
          const postData = await postService.show(postId);
          console.log('postData: ', postData);
          setPost(postData);
        };
        fetchPost();
      }, [postId]);

      // VERIFY THAT POST STATE IS BEING SET CORRECTLY 
      console.log('post state: ', post); 

    const handleAddComment = async (commentFormData) => {
        const newComment = await commentService.create(postId, commentFormData); 
        setPost({...post, comments: [...post.comments, newComment]}); 
    };

    const handleDeleteComment = async (commentId) => {
        console.log('commentId:', commentId);
        const deleteComment = await commentService.deleteComment(postId, commentId)
        setPost({...post, comments: post.comments.filter((comment) => comment._id !== commentId)});
      };

    if (!post) return <main>no tales of travel, yet...</main>  
    return (
        <>
                {/* <div
                    ref={mapContainerRef}
                    className="map-container"
                    id='map'
                /> */}
                 <h1>{post.title} {post.vibeCheck && '🌎'}</h1>
                <div className="post-content">
                <img
                alt={`static Mapbox map of the ${post.location} bay area`}
                src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${post.geocoordinates[0]},${post.geocoordinates[1]},9.67,0.00,0.00/1000x600@2x?access_token=${accessToken}`}
                />
                <header>
                   
                    <h3>{post.location}</h3>
                    <p>{post.startOfTravel}</p>
                    <p>{post.endOfTravel}</p>
                    <p>{post.insight}</p>
                    {post.author._id === user._id && (
                        <>
                            <Link to={`/posts/${postId}/edit`}>edit.</Link>
                            <button onClick={() => handleDeletePost(postId)}>delete.</button>
                        </>
                    )}
                </header>
                </div>
           
            <section>
                <h2>comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!post.comments.length && <p>there are no comments.</p>}
                {post.comments.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {comment.author.name} posted on {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                        <p>{comment.text}</p>
                        {comment.author._id === user._id && (
                                <>
                                    <Link to={`/posts/${postId}/comments/${comment._id}/edit`}>edit comment.</Link>
                                    <button onClick={() =>handleDeleteComment(comment._id)}>delete comment.</button>
                                </>
                            )}
                    </article>
                ))}
            </section>
        </>
    );
};

export default postDetails;

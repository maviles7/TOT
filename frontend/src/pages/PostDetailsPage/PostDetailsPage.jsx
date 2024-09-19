import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import * as postService from "../../services/postService";
import * as commentService from "../../services/commentService";

import CommentForm from "../../components/CommentForm/CommentForm";

const accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;

const postDetails = ({ user, handleDeletePost }) => {
  const { postId } = useParams();
  console.log("postId: ", postId);

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postService.show(postId);
      console.log("postData: ", postData);
      setPost(postData);
    };
    fetchPost();
  }, [postId]);

  // VERIFY THAT POST STATE IS BEING SET CORRECTLY
  console.log("post state: ", post);

  const handleAddComment = async (commentFormData) => {
    const newComment = await commentService.create(postId, commentFormData);
    setPost({ ...post, comments: [...post.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    console.log("commentId:", commentId);
    const deleteComment = await commentService.deleteComment(postId, commentId);
    setPost({
      ...post,
      comments: post.comments.filter((comment) => comment._id !== commentId),
    });
  };

  if (!post) return <main>no tales of travel, yet...</main>;
  return (
    <>
      <br />
      <h1>
        {post.title} {post.vibeCheck && "🌎"}
      </h1>
      <div className="post-content">
        <img
          alt={`static Mapbox map of the ${post.location} area`}
          src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/${post.geocoordinates[0]},${post.geocoordinates[1]},10,0.00,20/1000x600@2x?access_token=${accessToken}`}
        />
        {post.photo && <img src={`${post.photo}`} />}
        <header>
          <h3>{post.location}</h3>
          <p>
            {new Date(post.startOfTravel).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            {new Date(post.endOfTravel).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>{post.insight}</p>
          {post.author._id === user._id && (
            <div className="edit-delete">
              <Link to={`/posts/${postId}/edit`}>edit.</Link>
              <button onClick={() => handleDeletePost(postId)}>delete.</button>
            </div>
          )}
        </header>
      </div>

      <div>
        <h2>comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!post.comments.length && <p>there are no comments.</p>}
        {post.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p className="commentHeader">
                {comment.author.name} posted on{" "}
                {new Date(comment.createdAt).toLocaleDateString()}:
              </p>
            </header>
            <h3>{comment.text}</h3>
            {comment.author._id === user._id && (
              <div className="edit-delete">
                <Link to={`/posts/${postId}/comments/${comment._id}/edit`}>
                  edit comment.
                </Link>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  delete comment.
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
};

export default postDetails;

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import * as postService from '../../services/postService'; 
import * as commentService from '../../services/commentService'; 

import CommentForm from "../../components/CommentForm/CommentForm";

const postDetails = ({ user, handleDeletePost }) => {
    const { postId } = useParams(); 
    console.log('postId: ', postId); 

    const [post, setPost] = useState(null); 

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

    if (!post) return <main>idk???</main>  
    return (
        <main>
            <header>
                <h1>{post.title}</h1>
                <p>{post.location}</p>
                {post.author._id === user._id && (
                    <>
                        <Link to={`/posts/${postId}/edit`}>edit.</Link>
                        <button onClick={() => handleDeletePost(postId)}>delete.</button>
                    </>
                )}
            </header>
            <section>
                <h2>comments</h2>
                <CommentForm handleAddComment={handleAddComment} />
                {!post.comments.length && <p>there are no comments</p>}
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
                                    <Link to={`/posts/${postId}/comments/${comment._id}`}>edit comment.</Link>
                                    <button onClick={() =>handleDeleteComment(comment._id)}>delete comment.</button>
                                </>
                            )}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default postDetails;

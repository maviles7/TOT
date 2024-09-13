import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as postService from '../../services/postService'; 

const postDetails = (props) => {
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

      // VERIFY THAT HOOT STATE IS BEING SET CORRECTLY 
      console.log('post state: ', post); 

    if (!post) return <main>idk???</main>  
    return (
        <main>
            <header>
                <h1>{post.title}</h1>
                <p>{post.location}</p>
            </header>
        </main>
    );
};

export default postDetails;

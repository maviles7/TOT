import { useParams } from "react-router-dom";
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

  return <h2>Specific Post Details</h2>;
};

export default postDetails;

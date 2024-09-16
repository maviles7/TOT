import { useState } from "react";

import * as commentService from '../../services/commentService'; 

const CommentForm = ({ handleAddComment }) => {
    const [commentFormData, setCommentFormData] = useState({ text: '' }); 

    const handleChange = (event) => {
        setCommentFormData({...CommentForm, [event.target.name]: event.target.value }); 
    }; 

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddComment(commentFormData);
        setCommentFormData({ text: '' });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="text-input">comment:</label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={commentFormData.text}
            onChange={handleChange}
          />
          <button type="submit">add comment.</button>
        </form>
      );
}; 

export default CommentForm; 
import { useState } from "react";

const PostForm = (props) => {
    const [postFormData, setPostFormData] = useState({
        title: '', 
        location: '', 
        startOfTravel: Date().toLocaleDateString, 
        endofTravel: Date().toLocaleDateString, 
        insight: '',
        vibeCheck: false,
    });

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value; 
        setPostFormData({...postFormData, [event.target.name]: value}); 
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        props.handleAddPost(postFormData); 
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title-input">title:</label>
                <input 
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={postFormData.title}
                    onChange={handleChange}
                />

                <label htmlFor="location-input">location:</label>
                <input 
                    required
                    type="text"
                    name="location"
                    id="location-input"
                    value={postFormData.location}
                    onChange={handleChange}
                />

                <label htmlFor="start-of-travel-input">start of travel:</label>
                <input 
                    required
                    type="date"
                    name="startOfTravel"
                    id="start-of-travel-input"
                    value={postFormData.startOfTravel}
                    onChange={handleChange}
                />

                <label htmlFor="end-of-travel-input">end of travel:</label>
                <input 
                    required
                    type="date"
                    name="endOfTravel"
                    id="end-of-travel-input"
                    value={postFormData.endofTravel}
                    onChange={handleChange}
                />

                <label htmlFor="insight-input">insight:</label>
                <textarea
                    name="insight"
                    id="insight-input"
                    value={postFormData.insight}
                    onChange={handleChange}
                > 
                </textarea>

                <label htmlFor="vibe-check-input">vibe check:</label>
                <input 
                    type="checkbox"
                    name="vibeCheck"
                    id="vibe-check-input"
                    checked={postFormData.vibeCheck}
                    onChange={handleChange}
                />

                <button type="submit">add post.</button>
            </form>
        </main>
    )
}

export default PostForm; 
import { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';

const Update = (props) => {
    const { id } = useParams();
    const {query} = useLocation(); 
    console.log(query);
    console.log(props);
    const [title, setTitle] = useState(query.title);
    const [body, setBody] = useState(query.body);
    const [author, setAuthor] = useState(query.author);
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        console.log(blog);
        setIsPending(true);

        fetch('http://localhost:8000/update/'+ id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            history.push('/');
        });
    }

    return ( 
        <div className="create">
            <h2>Update a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required  
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                { !isPending && <button>Update blog</button>}
                { isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Update;
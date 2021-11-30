import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();

    const { data: blog , error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + blog._id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading ...</div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleClick}>delete</button>
                    <button><Link className="blog-link" to={{pathname:`/update/${blog._id}`, query: {
                        title:blog.title,
                        body:blog.body,
                        author: blog.author}
                    }}>update</Link></button>
                </article>
            ) }
        </div>
     );
}
 
export default BlogDetails;
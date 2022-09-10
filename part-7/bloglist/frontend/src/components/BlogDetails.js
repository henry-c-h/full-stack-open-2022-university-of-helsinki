import { useState } from 'react';
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BlogDetails = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(blog.comments);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes((prev) => prev + 1);
    dispatch(
      likeBlog({
        ...blog,
        likes: newLikes,
        user: blog.user.id,
      }),
    );
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      navigate('/');
    }
  };

  const submitComment = (e) => {
    e.preventDefault();
    setComments((prev) => [...prev, comment]);
    setComment('');
    dispatch(commentBlog(blog.id, { comment }));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        likes: {likes}{' '}
        <button className="like-btn" onClick={handleLike}>
          like
        </button>
      </p>
      <p>added by {blog.user.username}</p>
      {blog.user.username === user.username ? (
        <button className="remove-btn" onClick={handleRemove}>
          remove
        </button>
      ) : null}
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {comments.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetails;

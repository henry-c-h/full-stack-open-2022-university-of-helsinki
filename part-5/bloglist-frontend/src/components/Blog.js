import { useState } from 'react';

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const onClickLike = async () => {
    const newLikes = likes + 1;
    setLikes((prev) => prev + 1);
    await handleLike({
      ...blog,
      likes: newLikes,
      user: blog.user.id,
    });
  };

  return (
    <div style={blogStyle} className="blog-item">
      <div>
        {blog.title} {blog.author}{' '}
        <button className="view-btn" onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails ? (
        <div>
          <p>{blog.url}</p>
          <p>
            likes: {likes}{' '}
            <button className="like-btn" onClick={onClickLike}>
              like
            </button>
          </p>
          <p>{blog.user.username}</p>
          {blog.user.username === user.username ? (
            <button className="remove-btn" onClick={() => handleRemove(blog)}>
              remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;

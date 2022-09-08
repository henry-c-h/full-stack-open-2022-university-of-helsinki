import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const handleLike = async (updatedBlog) => {
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog);
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === updatedBlog.id ? returnedBlog : blog)),
    );
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      setBlogs((prev) => prev.filter((b) => blog.id !== b.id));
    }
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(newBlog);
      setBlogs((prev) => [...prev, returnedBlog]);
      setMessage({
        content: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        isError: false,
      });
      setTimeout(() => setMessage({ content: '' }), 5000);
    } catch (exception) {
      setMessage({
        content: `An error occured: ${exception.message}`,
        isError: true,
      });
      setTimeout(() => setMessage({ content: '' }), 5000);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>blogs</h2>
          {message.content ? <Notification message={message} /> : null}
          <p>
            {user.name} logged in
            <button className="logout-btn" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLike={handleLike}
                handleRemove={handleRemove}
              />
            ))}
        </div>
      ) : (
        <LoginForm
          setUser={setUser}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default App;

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { updateNotification } from '../reducers/notificationReducer';
import { TextField, Button } from '@mui/material';

const BlogForm = ({ toggleRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle('');
    setAuthor('');
    setUrl('');
    toggleRef.toggleVisibility();
    try {
      dispatch(createBlog({ title, author, url }));
      dispatch(
        updateNotification({
          content: `a new blog ${title} by ${author} added`,
          isError: false,
        }),
      );
      setTimeout(() => dispatch(updateNotification({})), 5000);
    } catch (exception) {
      dispatch(
        updateNotification({
          content: `An error occured: ${exception.message}`,
          isError: true,
        }),
      );
      setTimeout(() => dispatch(updateNotification({})), 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label htmlFor="title">title:</label> */}
          <TextField
            sx={{ m: '10px' }}
            size="small"
            type="text"
            name="title"
            label="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="author">author:</label> */}
          <TextField
            sx={{ m: '10px' }}
            size="small"
            type="text"
            name="author"
            label="author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="url">url:</label> */}
          <TextField
            sx={{ m: '10px' }}
            type="text"
            name="url"
            label="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size="small"
          />
        </div>
        <Button type="submit" id="create-btn" variant="contained">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;

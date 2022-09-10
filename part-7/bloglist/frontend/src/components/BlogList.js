import Togglable from './Togglable';
import Blog from './Blog';
import BlogForm from './BlogForm';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';

const BlogList = () => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleRef={blogFormRef.current} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;

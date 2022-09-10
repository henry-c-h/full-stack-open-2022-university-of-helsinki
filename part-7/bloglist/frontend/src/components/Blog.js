import { Link } from 'react-router-dom';
import { TableRow, TableCell } from '@mui/material';

const Blog = ({ blog }) => {
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  return (
    // <div style={blogStyle} className="blog-item">
    <TableRow className="blog-item">
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
    </TableRow>
    // </div>
  );
};

export default Blog;

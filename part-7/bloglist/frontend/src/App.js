import { useEffect, useState } from 'react';
import LoginForm from './components/Login';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import Users from './components/Users';
import User from './components/User';
import BlogDetails from './components/BlogDetails';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import { Routes, Route, useMatch } from 'react-router-dom';
import userService from './services/users';
import { Container, Typography } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((allUsers) => setUsers(allUsers));
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  const userMatch = useMatch('/users/:id');
  const userToDisplay = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const blogToDisplay = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      {user ? (
        <div>
          <Navbar />
          <Typography variant="h2">blog app</Typography>
          {notification.content ? (
            <Notification notification={notification} />
          ) : null}
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route
              path="/users/:id"
              element={userToDisplay ? <User user={userToDisplay} /> : null}
            />
            <Route
              path="/blogs/:id"
              element={
                blogToDisplay ? <BlogDetails blog={blogToDisplay} /> : null
              }
            />
          </Routes>
        </div>
      ) : (
        <LoginForm />
      )}
    </Container>
  );
};

export default App;

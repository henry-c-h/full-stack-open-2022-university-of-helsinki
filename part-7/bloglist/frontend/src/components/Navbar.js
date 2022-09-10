import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loggoutUser } from '../reducers/userReducer';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(loggoutUser());
  };

  return (
    // <div>
    //   <Link to="/">blogs</Link> <Link to="/users">users</Link>{' '}
    //   <span>
    //     {user.username} logged in{' '}
    //     <button className="logout-btn" onClick={handleLogout}>
    //       logout
    //     </button>
    //   </span>
    // </div>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Typography variant="body1" sx={{ ml: 'auto' }}>
          {user.username} logged in
        </Typography>
        <Button color="inherit" className="logout-btn" onClick={handleLogout}>
          logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

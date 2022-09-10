import { useState } from 'react';
import Notification from './Notification';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';
import { Typography, TextField, Button } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Typography variant="h2">Log in to application</Typography>
      {notification.content ? (
        <Notification notification={notification} />
      ) : null}
      <form onSubmit={handleLogin}>
        <div>
          {/* <label htmlFor="username">username</label> */}
          <TextField
            sx={{ m: '10px' }}
            type="text"
            name="username"
            id="username"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="password">password</label> */}
          <TextField
            sx={{ m: '10px' }}
            type="password"
            name="password"
            id="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          sx={{ m: '10px' }}
          variant="contained"
          id="login-btn"
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;

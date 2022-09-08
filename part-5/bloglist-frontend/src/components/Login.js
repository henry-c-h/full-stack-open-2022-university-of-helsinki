import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import Notification from './Notification';

const LoginForm = ({ setUser, message, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setMessage({
        content: 'Wrong username or password',
        isError: true,
      });
      setTimeout(() => setMessage({ content: '' }), 5000);
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      {message.content ? <Notification message={message} /> : null}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-btn">login</button>
      </form>
    </div>
  );
};

export default LoginForm;

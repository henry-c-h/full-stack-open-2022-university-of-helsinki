import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  const rows = users.map((u) => {
    return (
      <tr key={u.id}>
        <td>
          <Link to={`/users/${u.id}`}>{u.username}</Link>
        </td>
        <td>{u.blogs.length}</td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Users;

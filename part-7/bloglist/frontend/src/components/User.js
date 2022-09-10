const User = ({ user }) => {
  const blogs = user.blogs.map((b) => {
    return <li key={b.title}>{b.title}</li>;
  });
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>{blogs}</ul>
    </div>
  );
};

export default User;

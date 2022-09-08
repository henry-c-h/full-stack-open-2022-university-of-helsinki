const Notification = ({ message }) => {
  const styles = {
    border: `2px solid ${message.isError ? 'orangered' : 'green'}`,
    color: `${message.isError ? 'orangered' : 'green'}`,
    fontSize: '18px',
    backgroundColor: '#ddd',
    padding: '10px',
  };

  return (
    <div className="notification" style={styles}>
      {message.content}
    </div>
  );
};

export default Notification;

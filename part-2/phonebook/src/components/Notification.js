const Notification = ({ message }) => {
  const { isError, content } = message;
  return (
    <>
      {content ? (
        <div className={isError ? 'message error' : 'message success'}>
          {content}
        </div>
      ) : null}
    </>
  );
};

export default Notification;

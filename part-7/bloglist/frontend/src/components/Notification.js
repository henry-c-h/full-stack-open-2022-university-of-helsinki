import { Alert } from '@mui/material';

const Notification = ({ notification }) => {
  // const styles = {
  //   border: `2px solid ${notification.isError ? 'orangered' : 'green'}`,
  //   color: `${notification.isError ? 'orangered' : 'green'}`,
  //   fontSize: '18px',
  //   backgroundColor: '#ddd',
  //   padding: '10px',
  // };

  return (
    <div className="notification">
      <Alert severity={notification.isError ? 'error' : 'success'}>
        {notification.content}
      </Alert>
    </div>
  );
};

export default Notification;

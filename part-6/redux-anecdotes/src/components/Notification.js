// import { useSelector } from 'react-redux';

// const Notification = () => {
//   const notification = useSelector((state) => state.notification);
//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//   };
//   return <div style={style}>{notification}</div>;
// };

// export default Notification;

// using connect
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps, null)(Notification);

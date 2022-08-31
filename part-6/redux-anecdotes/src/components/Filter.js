// import { changeFilter } from '../reducers/filterReducer';
// import { useDispatch } from 'react-redux';

// const Filter = () => {
//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     // input-field value is in variable event.target.value
//     dispatch(changeFilter(event.target.value));
//   };
//   const style = {
//     marginBottom: 10,
//   };

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//     </div>
//   );
// };

// export default Filter;

// using connect
import { changeFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = ({ changeFilter }) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    changeFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = { changeFilter };

export default connect(null, mapDispatchToProps)(Filter);

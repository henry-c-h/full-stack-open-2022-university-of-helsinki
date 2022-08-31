// import { useDispatch } from 'react-redux';
// import { createAnecdote } from '../reducers/anecdoteReducer';
// import { setNotification } from '../reducers/notificationReducer';

// const AnecdoteForm = () => {
//   const dispatch = useDispatch();

//   const addAnecdote = async (e) => {
//     e.preventDefault();
//     const content = e.target.anecdote.value;
//     e.target.anecdote.value = '';
//     dispatch(createAnecdote(content));
//     dispatch(setNotification(`You added: ${content}`, 5));
//   };

//   return (
//     <div>
//       <h2>create new</h2>
//       <form onSubmit={addAnecdote}>
//         <div>
//           <input name="anecdote" />
//         </div>
//         <button>create</button>
//       </form>
//     </div>
//   );
// };

// export default AnecdoteForm;

// using connect
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    props.createAnecdote(content);
    props.setNotification(`You added: ${content}`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);

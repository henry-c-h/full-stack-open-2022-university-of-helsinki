// import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
// import noteService from '../services/notes';

const NewNote = (props) => {
  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = '';
    // const newNote = await noteService.createNew(content);
    // dispatch(createNote(content));
    props.createNote(content);
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button>add</button>
    </form>
  );
};

// export default NewNote;

export default connect(null, { createNote })(NewNote);

// alternative form of mapDispatchToProps
// const mapDispatchToProps = dispatch => {
//   return {
//     createNote: value => dispatch(createNote(value))
//   }
// }

import { createSlice } from '@reduxjs/toolkit';
import noteService from '../services/notes';

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ];

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// returns an object that contains the reducer and action creators
// access using noteSlice.reducer and noteSlice.actions
const noteSlice = createSlice({
  // name defines the prefix in action's type, e.g. notes/createNote
  name: 'notes',
  // initialState defines the reducer's initial state
  initialState: [],
  // an object of case reducers (similar to a case statement in switch), key names will be used to generate actions
  reducers: {
    // createNote(state, action) {
    //   state.push(action.payload);
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

// const noteReducer = (state = initialState, action) => {
//   if (action.type === 'NEW_NOTE') {
//     // return state.concat(action.data);
//     return [...state, action.data];
//   }
//   if (action.type === 'TOGGLE_IMPORTANCE') {
//     const id = action.data.id;
//     const noteToChange = state.find((n) => n.id === id);
//     const changedNote = {
//       ...noteToChange,
//       important: !noteToChange.important,
//     };
//     return state.map((note) => (note.id !== id ? note : changedNote));
//   }
//   return state;
// };

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     data: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     data: { id },
//   };
// };

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;

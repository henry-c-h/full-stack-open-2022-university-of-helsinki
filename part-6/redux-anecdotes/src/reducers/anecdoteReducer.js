// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = [initialState], action) => {
//   if (action.type === 'VOTE') {
//     const votedNote = state.find((note) => note.id === action.id);
//     const changedNote = { ...votedNote, votes: votedNote.votes + 1 };
//     return state.map((note) => (note.id === action.id ? changedNote : note));
//   }
//   if (action.type === 'NEW_ANECDOTE') {
//     const newNote = asObject(action.data.content);
//     return [...state, newNote];
//   }
//   return state;
// };

// export default reducer;

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     id: id,
//   };
// };

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: { content },
//   };
// };

import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   state.push(action.payload);
    // },
    // voteAnecdote(state, action) {
    //   const id = action.payload;
    //   const votedNote = state.find((note) => note.id === id);
    //   const changedNote = { ...votedNote, votes: votedNote.votes + 1 };
    //   return state.map((note) => (note.id === id ? changedNote : note));
    // },
    updateAnecdote(state, action) {
      const id = action.payload.id;
      return state.map((note) => (note.id === id ? action.payload : note));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { updateAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(updateAnecdote(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;

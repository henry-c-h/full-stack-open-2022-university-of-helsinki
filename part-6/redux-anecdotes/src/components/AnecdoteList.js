import { useSelector, useDispatch } from 'react-redux';
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import Notification from './Notification';
import Filter from './Filter';
// import anecdoteService from '../services/anecdote';
import { useEffect, useState } from 'react';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);

  const anecdotes = useSelector(({ anecdotes, _, filter }) => {
    const anecdotesToDisplay = !filter
      ? anecdotes
      : anecdotes.filter((anecdote) => anecdote.content.includes(filter));
    return [...anecdotesToDisplay].sort((a, b) => {
      if (a.votes > b.votes) return -1;
      if (a.votes < b.votes) return 1;
      return 0;
    });
  });

  const notification = useSelector((state) => state.notification);

  const vote = (anecdote) => {
    clearTimeout(timeoutId);
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote));
    setTimeoutId(
      dispatch(setNotification(`You voted: ${anecdote.content}`, 5)),
    );
    // dispatch(changeNotification(anecdote.content));
    // setTimeout(() => dispatch(removeNotification()), 5000);
  };

  useEffect(() => {
    // anecdoteService
    //   .getAll()
    //   .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <>
      <h2>Anecdotes</h2>
      {notification ? <Notification /> : null}
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

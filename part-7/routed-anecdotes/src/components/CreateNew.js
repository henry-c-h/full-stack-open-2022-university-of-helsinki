import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks/index';

const CreateNew = (props) => {
  const content = useField('text').attrs;
  const author = useField('text').attrs;
  const info = useField('text').attrs;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
    props.setNotification(`a new anecdote ${content.value} created!`);
    setTimeout(() => props.setNotification(''), 5000);
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;

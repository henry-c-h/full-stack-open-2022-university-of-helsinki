import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

let blog;
let mockhandlerLike;

beforeEach(() => {
  blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 1,
    user: {
      username: 'test user',
      name: 'test user',
    },
  };

  const user = {
    username: 'test user',
    name: 'test user',
  };

  mockhandlerLike = jest.fn();

  render(<Blog blog={blog} user={user} handleLike={mockhandlerLike} />);
});

test('renders title and author', () => {
  const blogElement = screen.queryByText(`${blog.title} ${blog.author}`);
  const urlElement = screen.queryByText('test url');
  const likesElement = screen.queryByText('1');
  expect(blogElement).toBeDefined();
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});

test('renders url and likes when view button is clicked', async () => {
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);
  const urlElement = screen.queryByText('test url');
  const likesElement = screen.queryByText('1');
  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
});

test('clicking the like button twice calls the event handler twice', async () => {
  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);
  const likeButton = screen.getByText('like');
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockhandlerLike.mock.calls).toHaveLength(2);
});

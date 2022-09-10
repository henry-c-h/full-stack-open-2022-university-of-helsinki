import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('the submit event handler is called with correct input details', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  render(<BlogForm handleCreateBlog={createBlog} />);

  const titleInput = screen.getByLabelText('title:');
  const authorInput = screen.getByLabelText('author:');
  const urlInput = screen.getByLabelText('url:');
  const submitButton = screen.getByText('create');

  await user.type(titleInput, 'test title');
  await user.type(authorInput, 'test author');
  await user.type(urlInput, 'test url');
  await user.click(submitButton);

  expect(createBlog.mock.calls.length).toBe(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'test url',
  });
});

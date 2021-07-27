import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import UserNameFilterContext from '../contexts/UserNameFilterContext';

it('displays a table of the retrieved users', async () => {
  const users = [
    {
      id: 1,
      name: 'Name 1',
      email: 'email1@example.com',
      address: {
        city: 'City 1',
      },
      company: {
        name: 'Company 1',
      },
    },
    {
      id: 2,
      name: 'Name 2',
      email: 'email2@example.com',
      address: {
        city: 'City 2',
      },
      company: {
        name: 'Company 2',
      },
    },
    {
      id: 3,
      name: 'Name 3',
      email: 'email3@example.com',
      address: {
        city: 'City 3',
      },
      company: {
        name: 'Company 3',
      },
    },
  ];

  const { container } = render(
    <UserNameFilterContext.Provider value={{
      userName: '',
      handleUserNameChange: jest.fn(),
      users,
      filteredUsers: [users[0], users[2]],
    }}
    >
      <UserList />
    </UserNameFilterContext.Provider>,
  );

  const table = container.firstChild;
  expect(table!.textContent).toContain('Name 1');
  expect(table!.textContent).not.toContain('Name 2');
  expect(table).toMatchSnapshot();
});

it('displays a message in the table when no user is retrieved', async () => {
  const { container } = render(
    <UserNameFilterContext.Provider value={{
      userName: '',
      handleUserNameChange: jest.fn(),
      users: [],
      filteredUsers: [],
    }}
    >
      <UserList />
    </UserNameFilterContext.Provider>,
  );
  const message = screen.getByText('No User Found.');
  expect(message).toBeInTheDocument();

  const table = container.firstChild;
  expect(table).toMatchSnapshot();
});

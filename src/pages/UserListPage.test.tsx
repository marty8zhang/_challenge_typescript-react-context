import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserListPage from './UserListPage';
import ServicesContext from '../contexts/ServicesContext';

it('filters users by name', async () => {
  const mockedGetUsers = jest.fn().mockResolvedValue([
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
  ]);
  const mockedServices = {
    userGateway: {
      getUsers: mockedGetUsers,
    },
  };

  const { container } = render(
    <ServicesContext.Provider value={mockedServices}>
      <UserListPage />
    </ServicesContext.Provider>,
  );
  await screen.findByText('Name 1');

  const table = container.querySelector('table') as HTMLTableElement;
  expect(table.textContent).toContain('Name 2');
  expect(table).toMatchSnapshot();

  const input = screen.getByLabelText('Filter Users by Name:') as HTMLInputElement;
  userEvent.type(input, 'Name 3');
  expect(table.textContent).not.toContain('Name 1');
  expect(table.textContent).not.toContain('Name 2');

  userEvent.type(input, '4');
  expect(table.textContent).not.toContain('Name 1');
  expect(table.textContent).not.toContain('Name 2');
  expect(table.textContent).not.toContain('Name 3');

  userEvent.clear(input);
  expect(table.textContent).toContain('Name 1');
  expect(table.textContent).toContain('Name 2');
  expect(table.textContent).toContain('Name 3');
});

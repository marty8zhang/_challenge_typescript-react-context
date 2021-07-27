import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserNameFilter from './UserNameFilter';
import UserNameFilterContext from '../contexts/UserNameFilterContext';

it('has the name input which uses a Context', () => {
  const userName = 'Test Name';
  const handleUserNameChange = jest.fn();
  const contextValue = {
    userName, handleUserNameChange, users: [], filteredUsers: [],
  };

  render(
    <UserNameFilterContext.Provider value={contextValue}>
      <UserNameFilter />
    </UserNameFilterContext.Provider>,
  );

  const input = screen.getByLabelText('Filter Users by Name:') as HTMLInputElement;
  expect(input).toBeInTheDocument();
  expect(input.value).toBe(userName);

  userEvent.clear(input);
  expect(handleUserNameChange).toHaveBeenCalledTimes(1);

  userEvent.type(input, 'New Name');
  expect(handleUserNameChange).toHaveBeenCalledTimes(9);
});

import React from 'react';
import User from '../models/User';

export interface UserNameFilterContextValue {
  userName: string,
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  users: User[],
  filteredUsers: User[],
}

const UserNameFilterContext = React.createContext<UserNameFilterContextValue>({
  userName: '',
  handleUserNameChange: () => {},
  users: [],
  filteredUsers: [],
});

export { UserNameFilterContext as default };

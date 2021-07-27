import React, { useContext } from 'react';
import UserNameFilterContext from '../contexts/UserNameFilterContext';

export default function UserNameFilter() {
  const { userName, handleUserNameChange } = useContext(UserNameFilterContext);

  return (
    <div className="user-name-filter">
      <label htmlFor="user-name">
        Filter Users by Name:
        <input
          id="user-name"
          name="user-name"
          type="text"
          value={userName}
          onChange={handleUserNameChange}
        />
      </label>
    </div>
  );
}

import React, { useContext } from 'react';
import UserNameFilterContext from '../contexts/UserNameFilterContext';

export default function UserList() {
  const { filteredUsers } = useContext(UserNameFilterContext);
  const userList = filteredUsers.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.company.name}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {userList.length ? userList
          : (
            <tr>
              <td colSpan={4}>No User Found.</td>
            </tr>
          )}
      </tbody>
    </table>
  );
}

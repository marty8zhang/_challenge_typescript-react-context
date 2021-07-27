import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';
import UserNameFilterContext from '../contexts/UserNameFilterContext';

export interface UserListProps {
  history: History,
}

function UserList(props: UserListProps) {
  const { filteredUsers } = useContext(UserNameFilterContext);
  const { history } = props;
  const userList = filteredUsers.map((user) => (
    <tr key={user.id} onClick={() => history.push(`/post/${user.id}`)}>
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

export default withRouter(UserList);

import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import { History } from 'history';
import { Table } from 'react-bootstrap';
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
    <Table bordered hover responsive>
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
              <td colSpan={4} className="text-center">No User Found.</td>
            </tr>
          )}
      </tbody>
    </Table>
  );
}

export default withRouter(UserList);

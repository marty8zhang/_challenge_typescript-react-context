import React from 'react';
import User from '../models/User';
import ServicesContext from '../contexts/ServicesContext';
import { UserGatewayInterface } from '../gateways/UserGateway';
import UserNameFilter from '../components/UserNameFilter';
import UserNameFilterContext from '../contexts/UserNameFilterContext';
import UserList from '../components/UserList';

interface UserListState {
  userName: string,
  users: User[],
  filteredUsers: User[],
}

export default class UserListPage extends React.Component<any, UserListState> {
  private userNameChangeTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Readonly<any>) {
    super(props);

    this.handleUserNameChange = this.handleUserNameChange.bind(this);

    this.state = {
      userName: '',
      users: [],
      filteredUsers: [],
    };
  }

  componentDidMount() {
    const { userGateway }: { userGateway: UserGatewayInterface } = this.context;

    userGateway.getUsers()
      .then((users: User[]) => {
        this.setState({
          users,
          filteredUsers: users,
        });
      })
      .catch((error) => {
        this.setState(() => {
          throw error;
        });
      });
  }

  handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { target } = event;
    const userName = target.value;

    this.setState({
      userName,
    });

    // For demonstration purposes only. E.g., how to delay the filtering if it involves external
    // API requests.
    if (this.userNameChangeTimeoutId) {
      clearTimeout(this.userNameChangeTimeoutId);
      this.userNameChangeTimeoutId = null;
    }
    this.userNameChangeTimeoutId = setTimeout(() => {
      this.setState((prevState) => {
        const { users } = prevState;
        const filteredUsers = users.filter(
          (user) => user.name.toLowerCase().indexOf(userName.trim().toLowerCase()) !== -1,
        );

        return {
          ...prevState,
          filteredUsers,
        };
      });
    }, 1000);
  }

  render() {
    const { userName, users, filteredUsers } = this.state;

    return (
      <UserNameFilterContext.Provider value={{
        userName,
        handleUserNameChange: this.handleUserNameChange,
        users,
        filteredUsers,
      }}
      >
        <UserNameFilter />
        <UserList />
      </UserNameFilterContext.Provider>
    );
  }
}

UserListPage.contextType = ServicesContext;

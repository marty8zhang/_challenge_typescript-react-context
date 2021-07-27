import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import App from './App';
import ServicesContext from './contexts/ServicesContext';

it('renders okay with user row click event handling', async () => {
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
  const mockedGetPostsByUserId = jest.fn().mockResolvedValue([
    {
      userId: 1,
      id: 1,
      title: 'Test Post 1 Title',
      body: 'Test post 1 body',
    },
    {
      userId: 1,
      id: 2,
      title: 'Test Post 2 Title',
      body: 'Test post 2 body',
    },
  ]);
  const mockedServices = {
    userGateway: {
      getUsers: mockedGetUsers,
    },
    postGateway: {
      getPostsByUserId: mockedGetPostsByUserId,
    },
  };

  render(
    <ServicesContext.Provider value={mockedServices}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </ServicesContext.Provider>,
  );

  const firstUserName = await screen.findByText('Name 1');
  expect(firstUserName).toBeInTheDocument();

  userEvent.click(firstUserName);
  const firstPostTitle = await screen.findByText('Test Post 1 Title');
  expect(firstPostTitle).toBeInTheDocument();
});

const errorBoundaryTitle = 'Something went wrong.';

it('catches the users retrieval error with error boundary', async () => {
  const errorMessage = 'Test users retrieval error';
  const mockedGetUsers = jest.fn().mockRejectedValue(new Error(errorMessage));
  const mockedGetPostsByUserId = jest.fn().mockResolvedValue([]);
  const mockedServices = {
    userGateway: {
      getUsers: mockedGetUsers,
    },
    postGateway: {
      getPostsByUserId: mockedGetPostsByUserId,
    },
  };

  const history = createMemoryHistory();
  render(
    <ServicesContext.Provider value={mockedServices}>
      <Router history={history}>
        <App />
      </Router>
    </ServicesContext.Provider>,
  );

  const errorBoundaryTitleElement = await screen.findByText(errorBoundaryTitle);
  expect(errorBoundaryTitleElement).toBeInTheDocument();

  const errorMessageElement = screen.getByText(errorMessage);
  expect(errorMessageElement).toBeInTheDocument();
});

it('catches the user posts retrieval error with error boundary', async () => {
  const errorMessage = 'Test user posts retrieval error';
  const mockedGetPostsByUserId = jest.fn().mockRejectedValue(new Error(errorMessage));
  const mockedServices = {
    postGateway: {
      getPostsByUserId: mockedGetPostsByUserId,
    },
  };

  const history = createMemoryHistory();
  history.push('/post/1');
  render(
    <ServicesContext.Provider value={mockedServices}>
      <Router history={history}>
        <App />
      </Router>
    </ServicesContext.Provider>,
  );

  const errorBoundaryTitleElement = await screen.findByText(errorBoundaryTitle);
  expect(errorBoundaryTitleElement).toBeInTheDocument();
  const errorMessageElement = screen.getByText(errorMessage);
  expect(errorMessageElement).toBeInTheDocument();
});

it('catches the user id error in `/post/:userId` with error boundary', async () => {
  const errorMessage = 'Received an invalid user id in the URI while trying to retrieve user posts.';
  const mockedGetPostsByUserId = jest.fn().mockResolvedValue([]);
  const mockedServices = {
    postGateway: {
      getPostsByUserId: mockedGetPostsByUserId,
    },
  };

  const history = createMemoryHistory();
  history.push('/post/a');
  render(
    <ServicesContext.Provider value={mockedServices}>
      <Router history={history}>
        <App />
      </Router>
    </ServicesContext.Provider>,
  );

  const errorBoundaryTitleElement = await screen.findByText(errorBoundaryTitle);
  expect(errorBoundaryTitleElement).toBeInTheDocument();
  const errorMessageElement = screen.getByText(errorMessage);
  expect(errorMessageElement).toBeInTheDocument();
});

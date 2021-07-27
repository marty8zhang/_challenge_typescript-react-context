import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import PostListPage from './pages/PostListPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="App">
          <header className="App-header" />
          <main>
            <Switch>
              <Route path="/" exact>
                <UserListPage />
              </Route>
              <Route path="/post/:userId">
                <PostListPage />
              </Route>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

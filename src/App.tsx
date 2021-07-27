import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import PostListPage from './pages/PostListPage';

function App() {
  return (
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
  );
}

export default App;

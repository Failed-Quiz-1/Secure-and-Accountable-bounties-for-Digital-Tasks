import React from 'react';
import logo from './logo.svg';
import TaskListPage from './containers/TaskListPage';
import HomePage from './containers/HomePage';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div style={{paddingTop: '22px'}}>
      <Container>
        <HomePage />
      </Container>
    </div>
  );
}

export default App;

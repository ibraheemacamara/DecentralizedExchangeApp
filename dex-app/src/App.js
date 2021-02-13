import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import IkaCoin from './components/IkaCoin';
import Account from './components/Account';
import Transfer from './components/Transfer';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Welcome to Token Exhange Platform</h1>
        <IkaCoin ></IkaCoin>
        <Account></Account>
        <Transfer></Transfer>
      </Jumbotron>
    </Container>
  );
}

export default App;

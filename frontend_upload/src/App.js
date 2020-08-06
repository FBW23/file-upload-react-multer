import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Profile from './Profile';

function App() {

  return (
    <div className="App">
      <header className="App-header">

        <Switch>
          <Route exact path="/" component={Profile}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>


      {/* DISPLAY SOME IMAGE FROM THE BACKEND - WE MUST SPECIFY THE WHOLE URL */}
      {/* <img src="http://localhost:8000/uploads/8b40739e58b3ac2eaa42634fb79ec142" width="500" /> */}

      </header>
    </div>
  );
}

export default App;

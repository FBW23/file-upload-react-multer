import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';

function App() {

  let [file, setFile] = useState()

  const onSubmit = (e) => {
    e.preventDefault()

    let formData = new FormData()
    formData.append('user_image', file)

    fetch('http://localhost:8000/users/upload', {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      console.log("Data received: ", data)
    })
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="App">
      <header className="App-header">

        <Switch>
          <Route exact path="/">
            <h1>User Profile</h1>
            <form encType="multipart/form-data" onSubmit={onSubmit}>
              <input type="file" name="user_image" onChange={onFileChange} />
              <button type="submit">Upload</button>
            </form>
          </Route>
          <Route path="/login" component={Login}></Route>
        </Switch>


      {/* DISPLAY SOME IMAGE FROM THE BACKEND - WE MUST SPECIFY THE WHOLE URL */}
      {/* <img src="http://localhost:8000/uploads/8b40739e58b3ac2eaa42634fb79ec142" width="500" /> */}

      </header>
    </div>
  );
}

export default App;

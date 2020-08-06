import React, { useState } from 'react';
import './App.css';

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
        <h1>File Upload Demo</h1>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <input type="file" name="user_image" onChange={onFileChange} />
          <button type="submit">Upload</button>
        </form>

      {/* DISPLAY SOME IMAGE FROM THE BACKEND - WE MUST SPECIFY THE WHOLE URL */}
      {/* <img src="http://localhost:8000/uploads/8b40739e58b3ac2eaa42634fb79ec142" width="500" /> */}

      </header>
    </div>
  );
}

export default App;

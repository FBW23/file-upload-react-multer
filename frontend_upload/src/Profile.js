import React, { useState } from 'react';
import { useEffect } from 'react';

const Profile = () => {
  let [ user, setUser ] = useState({})
  let [ file, setFile ] = useState();

  // load user data
  useEffect(() => {
    fetch('http://localhost:8000/users/me', {
      credentials: "include"
    })
    .then(res => res.json())
    .then(user => {
      console.log("User received:", user)
      setUser(user)
    })
  }, []) // == componentDidMount

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('user_image', file);

    fetch('http://localhost:8000/users/me', {
      method: 'PATCH',
      credentials: 'include',
      body: formData
    })
      .then((res) => res.json())
      .then((user) => {
        console.log('Updated user received: ', user);
        setUser(user)
      });
  };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        {user.email && <p>Email: {user.email}</p> }
        <div>
        <img src={`http://localhost:8000/avatars/${user._id}`} style={{width: '300px'}} />
        </div>
        <input type="file" name="user_image" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Profile;

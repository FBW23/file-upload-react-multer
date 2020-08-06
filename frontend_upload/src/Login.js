import React, { useState } from 'react';

const Login = () => {
  let [ email, setEmail ] = useState();
  let [ password, setPassword ] = useState();

  const onSubmit = (e) => {

    e.preventDefault()

    fetch('http://localhost:8000/users/login', {
      method: 'POST',
      credentials: 'include', // will cause to store received cookie automatically in the browser 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) // => email: email, password: password
    })
      .then((res) => res.json())
      .then((user) => {
        console.log('User received: ', user);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input placeholder="Email..." type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input
            placeholder="Password..."
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

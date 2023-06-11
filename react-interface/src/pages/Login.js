import { Link } from "react-router-dom";
import { useState } from 'react';

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
      <>
        <header>
          <h1>Login Form</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>Username</label>
            <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)}/>
            <label>Password</label>
            <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit"/>
          </fieldset>
        </form>
      </>
  );
}

export default Login;
import { useEffect, useState } from 'react'
import './App.css'
import { Form } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);

  // get data from server 
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  // post data to server 
  const handleForm = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email }
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        Form.reset();
      })

  }

  return (
    <>

      <h1>User management client</h1>
      <h2>users: {users.length}</h2>

      {
        users.map(user => <p key={user.id}>{user.id}. {user.name} : {user.email}</p>)
      }

      <form onSubmit={handleForm}>
        <input type="text" name="name" placeholder='name' id="" />
        <br />
        <input type="email" name="email" placeholder='email' id="" />
        <br />
        <input type="submit" value="submit" />
      </form>

    </>
  )
}

export default App

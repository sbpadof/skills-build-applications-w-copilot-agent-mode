import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users API Endpoint:', apiUrl);
        console.log('Fetched Users:', results);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [apiUrl]);

  return (
    <div className="mt-4">
      <h2 className="mb-3">Users</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary mt-2">Invite User</button>
        </div>
      </div>
    </div>
  );
};

export default Users;

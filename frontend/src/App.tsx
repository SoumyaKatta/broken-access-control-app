import { useState } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [loginError, setLoginError] = useState<string>('');

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      setToken(res.data.token);
      setLoginError('');
    } catch {
      setLoginError('Login failed');
    }
  };

  const fetchAdminData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin-data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminData(res.data);
    } catch {
      setAdminData({ error: 'Access denied' });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Broken Access Control Demo (TS)</h1>

      <section>
        <h2>Login</h2>
        <button onClick={() => login('admin', 'admin123')}>Login as Admin</button>
        <button onClick={() => login('user', 'user123')}>Login as User</button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </section>

      <section style={{ marginTop: '1rem' }}>
        <h2>Fetch Admin Data</h2>
        <button onClick={fetchAdminData}>Access Admin API</button>
        <pre>{adminData && JSON.stringify(adminData, null, 2)}</pre>
      </section>
    </div>
  );
}

export default App;

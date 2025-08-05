import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const SECRET = 'supersecret';

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
];

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
    expiresIn: '1h',
  });

  return res.json({ token });
});

app.get('/admin-data', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
   if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    return res.json({
      message: 'Admin-only data: [TOP SECRET]',
      user: decoded,
    });
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

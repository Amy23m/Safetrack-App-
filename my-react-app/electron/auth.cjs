const bcrypt = require('bcryptjs');
const store = require('./authStore.cjs');

async function register({ name, email, password }) {
  if (!email || !password) throw new Error('Email and password required');
  const existing = store.findUserByEmail(email);
  if (existing) throw new Error('User already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(),
    name: name || '',
    email,
    password: hashed,
    createdAt: new Date().toISOString(),
  };

  const ok = store.addUser(user);
  if (!ok) throw new Error('Failed to persist user');
  return true;
}

async function login(email, password) {
  const user = store.findUserByEmail(email);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (match) return user;
  return null;
}

module.exports = { register, login };

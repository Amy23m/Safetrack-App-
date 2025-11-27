const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'users.json');

function readStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const txt = fs.readFileSync(DATA_FILE, { encoding: 'utf8' });
    if (!txt) return [];
    return JSON.parse(txt);
  } catch (e) {
    console.error('Failed to read user store', e);
    return [];
  }
}

function writeStore(users) {
  try {
    const tmp = DATA_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(users, null, 2), { encoding: 'utf8' });
    fs.renameSync(tmp, DATA_FILE);
    return true;
  } catch (e) {
    console.error('Failed to write user store', e);
    return false;
  }
}

function findUserByEmail(email) {
  const users = readStore();
  return users.find(u => u.email === email) || null;
}

function addUser(user) {
  const users = readStore();
  users.push(user);
  return writeStore(users);
}

module.exports = { readStore, writeStore, findUserByEmail, addUser, DATA_FILE };
